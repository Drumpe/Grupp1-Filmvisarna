import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { get, post } from '../utilsAndHooks/rest';
import { Link, useParams, useOutletContext } from "react-router-dom";
import ShowSeats from "../components/ShowSeats";
import { useNavigate } from 'react-router-dom';

const BARN_PRIS = 80;
const PENSIONARS_PRIS = 120;
const VUXEN_PRIS = 140;

const TheaterView = () => {
    const [{ user }] = useOutletContext();
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
        var booking = createBookingJson();
        setButtonsDisabled(true);
        var result = await post('bookings/detailed', booking);
        let isStatusSent = setBookedStatus();
        if (isStatusSent) {
            seatStatusFeed.close();
        }
        navigate('/ConfirmedView/' + result.bookingId);
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

    const increaseCount = (category) => {
        setTickets((prevTickets) => {
            const updatedTickets = { ...prevTickets }; 
            switch (category) {
                case 'barn':
                    if (updatedTickets.ordinary > 0) {
                        updatedTickets.ordinary -= 1;
                        updatedTickets.child += 1;
                    }
                    break;
                case 'pensionar':
                    if (updatedTickets.ordinary > 0) {
                        updatedTickets.ordinary -= 1;
                        updatedTickets.pensioner += 1;
                    }
                    break;
                default:
                    break;
            }
            return updatedTickets; 
        });
    };

    const decreaseCount = (category) => {
        setTickets((prevTickets) => {
            const updatedTickets = { ...prevTickets }; 
            switch (category) {
                case 'barn':
                    if (updatedTickets.child > 0) {
                        updatedTickets.ordinary += 1;
                        updatedTickets.child -= 1;
                    }
                    break;
                case 'pensionar':
                    if (updatedTickets.pensioner > 0) {
                        updatedTickets.ordinary += 1;
                        updatedTickets.pensioner -= 1;
                    }
                    break;
                default:
                    break;
            }
            return updatedTickets; 
        });
    };

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
            } else if (updatedTickets.child > 0){
                updatedTickets.child -= 1;
            } else if (updatedTickets.pensioner > 0){
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

    function makePriceCategoriesArray() {
        var result = [];
        for (let index = 0; index < tickets.pensioner; index++) {
            result.push(3);
        }
        for (let index = 0; index < tickets.child; index++) {
            result.push(2);
        }
        for (let index = 0; index < tickets.ordinary; index++) {
            result.push(1);
        }
        return result;
    }

    function createBookingJson() {
        var tmpBookingSeatsArr = [];
        var priceCat = makePriceCategoriesArray();
        var index = 0;
        seats.forEach((elem) => {
            if (elem.wanted) {
                tmpBookingSeatsArr.push({ SeatId: elem.seatId, PriceCategoryId: priceCat[index++] });
            }
        });
        const bookingData = {
            EmailAdress: user.userRole === "guest" ? formData.email : user.email,
            ScreeningId: screeningId,
            BookingXSeats: tmpBookingSeatsArr,
        }
        return bookingData;
    }

    function setBookedStatus() {
        let isStatusSent = seatStatusFeed.book();
        return isStatusSent;
    }

    return !seats ? null : (
        <Container className="mt-1">
            <Row>
                <Col className='d-flex justify-content-start'>
                    <Link className="nav-back text-info" to={`/MovieView/${movieId}`}>Tillbaka</Link>
                    <div></div>
                    <div></div>
                    <div></div>
                </Col>
            </Row>

            <ShowSeats {...{ seats, theater, seatClicked }} />

            <Row>
                <Col className="col-3 offset-4 mt-2">
                    <span style={{ fontSize: '22px' }}>Vuxen</span>
                </Col>
                <Col className="col-1 mt-2">
                    <div className="text-center">&nbsp;&nbsp;&nbsp;{tickets.ordinary}</div>
                </Col>
            </Row>
            <Row>
                <Col className="col-3 offset-4 mt-2">
                    <span style={{ fontSize: '22px' }}>Barn</span>
                </Col>
                <Col className="col mt-2">
                    <Button onClick={() => decreaseCount('barn')} variant="danger me-2" disabled={buttonsDisabled}>
                        --
                    </Button>
                    {tickets.child}&nbsp;
                    <Button onClick={() => increaseCount('barn')} variant="primary" disabled={buttonsDisabled}>
                        +
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="col-3 offset-4 mt-3">
                    <span style={{ fontSize: '22px' }}>Pensionär</span>
                </Col>
                <Col className="col mt-3">
                    <Button onClick={() => decreaseCount('pensionar')} variant="danger me-2" disabled={buttonsDisabled}>
                        –
                    </Button>
                    {tickets.pensioner}&nbsp;
                    <Button onClick={() => increaseCount('pensionar')} variant="primary" disabled={buttonsDisabled}>
                        +
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <span style={{ fontSize: '22px' }}>Summa: {summa} kr</span>
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
                        <Button variant="secondary"
                            disabled={buttonsDisabled}
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