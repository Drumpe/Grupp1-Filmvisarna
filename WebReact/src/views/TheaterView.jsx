import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { get, post } from '../utilsAndHooks/rest';
import { Link, useParams, useOutletContext, useNavigate } from "react-router-dom";
import ShowSeats from "../components/ShowSeats";
import ShowTicketType from "../components/ShowTicketType";
import { NavLink } from 'react-router-dom';
import createBookingJson from "../utilsAndHooks/createBookingJson";
import { displayScreeningDate, getLocaleDateString } from "../utilsAndHooks/formatter";

const BARN_PRIS = 80;
const PENSIONARS_PRIS = 120;
const VUXEN_PRIS = 140;

const TheaterView = () => {
    const [{ user, movies }] = useOutletContext();
    const { screeningId } = useParams();
    const [formData, setFormData] = useState({ email: '' });
    const [theater, setTheater] = useState({ id: 0, name: "" });
    const [seats, setSeats] = useState(null);
    const [tickets, setTickets] = useState({
        ordinary: 0,
        child: 0,
        pensioner: 0
    });
    const [movieId, setMovieId] = useState("");
    const [movie, setMovie] = useState(null);
    const [screening, setScreening] = useState(null);
    const [validatedEmail, setValidatedEmail] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const summa = (tickets.child * BARN_PRIS) + (tickets.pensioner * PENSIONARS_PRIS) + (tickets.ordinary * VUXEN_PRIS);
    const [seatStatusFeed, setSeatStatusFeed] = useState(null);
    let navigate = useNavigate();
    const [isWantedConflict, setIsWantedConflict] = useState(false);

    const sendRequest = async () => {
        if ((!validatedEmail && user.userRole === "guest") || summa == 0) {
            if (validatedEmail) {
                alert("Minst en biljett måste väljas för att boka.");
            }
            return;
        }
        var booking = createBookingJson(seats, user, screeningId, tickets, formData);
        setButtonsDisabled(true);
        var result = await post('bookings/detailed', booking);
        let isStatusSent = setBookedStatus();
        if (isStatusSent) {
            seatStatusFeed.close();
        }
        navigate('/ConfirmedView/' + result.bookingNumber);
    };

    //Init
    useEffect(() => {
        async function initSeats() {
            try {
                var screeningSeats = await get(`seats/screening/${screeningId}`);
                var seats = screeningSeats.seats;

                seats.forEach((seat) => {
                    seat.wanted = false;
                });

                setMovieId(screeningSeats.movieId);
                var theater = {
                    id: screeningSeats.theaterId,
                    name: screeningSeats.theater
                };
                let tmpMovie = movies.find(movie => movie.id === +screeningSeats.movieId);
                setScreening(screeningSeats);
                setMovie(tmpMovie);
                setTheater(theater);
                setSeats(seats);
            } catch (err) {
                console.log(err);
            }
        }
        initSeats();
    }, []); // Empty dependency array to run the effect only once

    useEffect(() => {
        if (isWantedConflict) {

            alert("Sätet du valt har just blivit bokat av någon annan.");
            setIsWantedConflict(false);
        }
    }, [isWantedConflict]);


    useEffect(() => {
        let feed = {
            socket: null,

            connect: async () => {
                // Uses ws://, incorrect certificate on my side for https/wss (Albin), fix later...
                feed.socket = new WebSocket(`ws://localhost:5052`);

                feed.socket.onmessage = async (ev) => {
                    let seatStatus = JSON.parse(ev.data);

                    if (seatStatus.status === `ready`) {
                        if (feed.socket !== null && feed.socket.readyState == WebSocket.OPEN) {
                            let message = JSON.stringify({
                                "status": "screening",
                                "screeningId": screeningId,
                            });
                            feed.socket.send(message);
                        }
                    } else if (seatStatus.status === `book`) {
                        let screeningSeats = await get(`seats/screening/${screeningId}`);
                        let updatedSeats = screeningSeats.seats;

                        seats.forEach((seat, i) => {
                            if (seat.wanted && !updatedSeats[i].booked) {
                                updatedSeats[i].wanted = true;
                            } else if (seat.wanted && updatedSeats[i].booked) {
                                seatClicked(seat.seatId);
                                setIsWantedConflict(true);
                            }
                        });
                        setSeats(updatedSeats);
                    }
                };
            },

            close: () => {
                if (feed.socket !== null && feed.socket.readyState == WebSocket.OPEN) {
                    feed.socket.close(1000, `Closing from client`);
                }
            },

            book: () => {
                if (feed.socket !== null && feed.socket.readyState == WebSocket.OPEN) {
                    let message = JSON.stringify({
                        "status": "book",
                        "screeningId": screeningId,
                    });
                    feed.socket.send(message);
                    return true;
                }
                return false;
            }
        };
        setSeatStatusFeed(feed);
        return () => {
            if (feed.socket) {
                feed.close();
            }
        };
    }, [screeningId, seats]);

    if (!seatStatusFeed) {
        return null;
    } else if (seatStatusFeed.socket == null) {
        seatStatusFeed.connect();
    }

    //När man klickar på ett säte 
    const seatClicked = (seatId) => {
        const updatedSeats = [...seats];
        const updatedTickets = tickets;
        const index = updatedSeats.findIndex((seat) => seat.seatId === seatId);

        if (!updatedSeats[index].wanted) { // Vill ha sätet
            updatedSeats[index].wanted = true;
            updatedTickets.ordinary += 1;
        } else { //Vill inte ha sätet mer
            updatedSeats[index].wanted = false;
            if (updatedTickets.ordinary > 0) {
                updatedTickets.ordinary -= 1;
            } else if (updatedTickets.child > 0) {
                updatedTickets.child -= 1;
            } else if (updatedTickets.pensioner > 0) {
                updatedTickets.pensioner -= 1;
            }
        }
        setSeats(updatedSeats);
        setTickets(updatedTickets);
    };

    function handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
    }

    function handleInputChange(event) {
        const form = event.currentTarget;
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (form.checkValidity() === false) {
            setValidatedEmail(false);
        } else {
            setValidatedEmail(true);
        }
    }

    function setBookedStatus() {
        let isStatusSent = seatStatusFeed.book();
        return isStatusSent;
    }
    if (!seats || !movie || !screening) {
        return (
            <Container className="mt-1">
                <div>Loading...</div>
            </Container>
        );
    }
    return (
        <Container className="mt-1">
            <Row className="mb-3">
                <Col className='d-flex justify-content-start'>
                    <NavLink to={`/MovieView/${movieId}`}>
                        <Button className="nav-back custom-btn text-secondary text-decoration-none" variant="info link" >Tillbaka</Button>
                    </NavLink>
                </Col>
            </Row>

            <Row className="d-block d-xxl-none">
                <Col className="text-center">
                    <p className="fst-italic text-gray">{movie.movie}, {getLocaleDateString(screening.screeningTime, { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                </Col>
            </Row>

            <div className="bg-gray-dark-transparent p-4 pb-5 rounded-3 custom-info d-none d-xxl-block">
                <div className="d-flex justify-content-between">
                    <div className="pe-3">
                        <h5 className="text-decoration-underline">{movie.movie}</h5>
                        <p className="fst-italic">{theater.name}</p>
                        <p>{getLocaleDateString(screening.screeningTime, { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                    </div>
                    <div className="ms-5"><img src={`/img/poster/${movie.images[0]}`} width="100" alt="Film" /></div>
                </div>
            </div>


            {/* <Row className="d-none d-lg-flex ">
                <Col className="col-4 offset-sm-2 offset-lg-4 col-sm-5 col-lg-3">

                    <p>{movie.movie}</p>
                    <p>{theater.name}</p>
                    <p>{getLocaleDateString(screening.screeningTime, { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                </Col>
                <Col className="col-6 col-sm-5 col-lg-4">
                    <img src={`/img/poster/${movie.images[0]}`} width="100" alt="Film" />
                </Col>
            </Row> */}

            <ShowSeats {...{ seats, seatClicked }} />

            <ShowTicketType {...{ tickets, buttonsDisabled, setTickets }} />

            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <span style={{ fontSize: '22px' }}>Att betala: {summa} kr</span>
                </Col>
            </Row>
            <Form validated={validatedEmail} onSubmit={handleSubmit}>
                {user.userRole === "guest" ?
                    <>
                        <Row className="mb-3">
                            <Col className="d-flex justify-content-center mt-3">
                                <Form.Group>
                                    <Form.Label>E-postadress</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            placeholder="namn@exempel.com"
                                            onChange={handleInputChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Ange din e-postadress.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                    :
                    <Row className="d-flex justify-content-center mt-3">Bokningen skickas till: {user.email}</Row>
                }
                <Row>
                    <Col className="d-flex justify-content-center mt-3">
                        <Button variant="primary"
                            disabled={buttonsDisabled || summa === 0 || (formData.email.length === 0 && user.userRole === "guest")}
                            type="submit"
                            onClick={sendRequest}
                        >Bekräfta bokning
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};
export default TheaterView;