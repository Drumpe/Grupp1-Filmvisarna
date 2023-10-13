import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { get, post } from '../utilsAndHooks/rest';
import { Link, useParams } from "react-router-dom";
import ShowSeats from "../components/ShowSeats";

const BARN_PRIS = 80;
const PENSIONARS_PRIS = 120;
const VUXEN_PRIS = 140;

const TheaterView = () => {
    const { screeningId } = useParams();
    //const [summaState, setSummaState] = useState(0);
    const [formData, setFormData] = useState({ email: '' });
    const [theater, setTheater] = useState({ id: 0, name: "" });
    let [seats, setSeats] = useState(null);
    const [tickets, setTickets] = useState({
        ordinary: 0,
        child: 0,
        pensioner: 0
    });
    const [movieId, setMovieId] = useState("");
    const [validated, setValidated] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const summa = (tickets.child * BARN_PRIS) + (tickets.pensioner * PENSIONARS_PRIS) + (tickets.ordinary * VUXEN_PRIS);

    const sendRequest = async () => {
        if (!validated || summa == 0) {
            if (validated) {
                alert("Minst en biljett måste väljas för att boka.");
            }
            return;
        }
        var booking = createBookingJson();
        setButtonsDisabled(true);
        var result = await post('bookings/detailed', booking);
        window.location.href = '/ConfirmedView/' + result.bookingId;
    };

    //Init
    useEffect(() => {
        async function initSeats() {
            try {
                var screeningJson = await get('screenings/bookedseats/' + screeningId);
                var theaterJson = await get('theaters/detailed/' + screeningJson.theaterId);
                var seatsArray = theaterJson.seats; //Alla säten i salongen 
                seatsArray.forEach((element) => {
                    //Här läggs till ett attribut till element, typ booked (boolean)
                    // om seatsArray.SeatId finns i jsonScreening.bookedSeats 
                    //  sätt element.booked till true annars false
                    if (screeningJson.bookedSeats.find(x => x.seatId === element.seatId)) {
                        element.booked = true;
                    } else {
                        element.booked = false;
                    }
                    element.wanted = false;
                });
                setMovieId(screeningJson.movieId);
                var tmpTheater = {
                    id: theaterJson.theaterId,
                    name: theaterJson.theater
                };
                setTheater(tmpTheater);
                setSeats(seatsArray);
            } catch (err) {
                console.log(err);
            }
        }
        initSeats();
    }, []); // Empty dependency array to run the effect only once

    const increaseCount = (category) => {
        setTickets((prevTickets) => {
            const updatedTickets = { ...prevTickets }; // Create a shallow copy
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
            return updatedTickets; // Return the updated state
        });
    };

    const decreaseCount = (category) => {
        setTickets((prevTickets) => {
            const updatedTickets = { ...prevTickets }; // Create a shallow copy
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
            return updatedTickets; // Return the updated state
        });
    };

    //När man klickar på ett säte 
    const seatClicked = (seatId) => {
        const updatedSeats = [...seats];
        const updatedTickets = tickets;
        const index = updatedSeats.findIndex((seat) => seat.seatId === seatId);

        updatedSeats[index].wanted = !updatedSeats[index].wanted; //Toggle wanted
        //Uppdatera tickets
        if (updatedSeats[index].wanted) {
            updatedTickets.ordinary += 1;
        } else if (updatedTickets.ordinary > 0) {
            updatedTickets.ordinary -= 1;
        } else {
            //Toggla tillbaks wanted
            updatedSeats[index].wanted = !updatedSeats[index].wanted; //Toggle wanted
        }
        setSeats(updatedSeats);
        setTickets(updatedTickets);
    };

    /* Changing to a const...
    //Räkna om summan om tickets ändras
    useEffect(() => {
        function raknaSumma() {
            const barnPris = 80;
            const pensionarPris = 120;
            const vuxenPris = 140;
            setSummaState((tickets.child * barnPris) + (tickets.retire * pensionarPris) + (tickets.ordinare * vuxenPris));
        }
        raknaSumma();
    }, [tickets, seats]); //seats för test
    */

    function handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
    };

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
    };

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
            EmailAdress: formData.email,
            ScreeningId: screeningId,
            BookingXSeats: tmpBookingSeatsArr,
        }
        return bookingData;
    };

    return !seats ? null : (
        <Container className="mt-5">
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

            <Form validated={validated} onSubmit={handleSubmit}>
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