import React, { useState, useEffect, useMemo } from "react"
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button, CloseButton, Form } from 'react-bootstrap';
import { get, post } from '../utilsAndHooks/rest';
import { useParams } from "react-router-dom";


const TheaterView = () => {
    const { screeningId } = useParams();
    const [summaState, setSummaState] = useState(0);
    const [formData, setFormData] = useState({ email: '' });
    const [theater, setTheater] = useState({ id: 0, name: "" });
    const [seats, setSeats] = useState(null);
    const [tickets, setTickets] = useState({
        ordinare: 0,
        child: 0,
        retire: 0
    });
    const [creatingShowSeats, setCreatingShowSeats] = useState(false);

    const sendRequest = async () => {
        /** Här borde göras kontroller innan vi skickar iväg och kolla att resultatet är ok */
        var booking = createBookingJson();
        var result = await post('bookings/detailed', booking);
        //console.log("Last check: "  + result.bookingId );
        window.location.href = '/ConfirmedView/' + result.bookingId;
    };

    //Init
    useEffect(() => {
        async function initSeats() {
            try {
                var screeningJson = await get('screenings/' + screeningId);
                var theaterJson = await get('theaters/' + screeningJson.theaterId);
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
                    if (updatedTickets.ordinare > 0) {
                        updatedTickets.ordinare -= 1;
                        updatedTickets.child += 1;
                    }
                    break;
                case 'pensionar':
                    if (updatedTickets.ordinare > 0) {
                        updatedTickets.ordinare -= 1;
                        updatedTickets.retire += 1;
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
                        updatedTickets.ordinare += 1;
                        updatedTickets.child -= 1;
                    }
                    break;
                case 'pensionar':
                    if (updatedTickets.retire > 0) {
                        updatedTickets.ordinare += 1;
                        updatedTickets.retire -= 1;
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
        const updatedSeat = [...seats];
        const updatedTickets = tickets;
        const index = updatedSeat.findIndex((seat) => seat.seatId === seatId);

        //console.log(`seatClicked(${seatId}) - ${index} - ${updatedSeat[index].wanted}  `);
        updatedSeat[index].wanted = !updatedSeat[index].wanted; //Toggle wanted
        //Uppdatera tickets
        if (updatedSeat[index].wanted) {
            updatedTickets.ordinare += 1;
        } else if (updatedTickets.ordinare > 0) {
            console.log(`${updatedTickets.child} - ${updatedTickets.retire} - ${updatedTickets.ordinare}  `);
            updatedTickets.ordinare -= 1;
        } else {
            //Toggla tillbaks wanted
            updatedSeat[index].wanted = !updatedSeat[index].wanted; //Toggle wanted
        }
        setSeats(updatedSeat);
        setTickets(updatedTickets);
    };

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


    function handleSubmit(event) {
        event.preventDefault();
        // Access and use formData state for form submission
        console.log(formData);
        // You can send the data to an API or perform other actions here
    };
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function makePriceCatsArray() {
        var result = [];
        for (let index = 0; index < tickets.retire; index++) {
            result.push(3);
        }
        for (let index = 0; index < tickets.child; index++) {
            result.push(2);
        }
        for (let index = 0; index < tickets.ordinare; index++) {
            result.push(1);
        }
        return result;
    };

    function createBookingJson() {
        var tmpBookingSeatsArr = [];
        var priceCat = makePriceCatsArray();
        var index = 0;
        seats.forEach((elem) => {
            if (elem.wanted) {
                tmpBookingSeatsArr.push({ SeatId: elem.SeatId, PriceCategoryId: priceCat[index++] });
            }
        });
        const bookingData = {
            EmailAdress: formData.email,
            ScreeningId: screeningId,
            BookingXSeats: tmpBookingSeatsArr,
        }
        return bookingData;
    };

    const ShowSeats = () => {
        const [result, setResult] = useState();
        const rowElements = useMemo(() => {
            // Organisera seats by rows
            const rows = {};
            seats.forEach((element) => {
                if (!rows[element.row]) {
                    rows[element.row] = [];
                }
                rows[element.row].push(element);
            });
            return Object.keys(rows).map((rowNumber) => (
                <Row key={rowNumber}>
                    {/*<Col className="col-2">Rad {rowNumber}</Col>*/}
                    <Col className="d-flex justify-content-center">
                        <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                {rows[rowNumber].map((seatElement) => (
                                    <Button onClick={() => seatClicked(seatElement.seatId)}
                                        variant={(seatElement.booked ? "danger" : seatElement.wanted ? "primary" : "secondary") + " me-2"} //Färgerna är test
                                        key={seatElement.seatId}
                                        disabled={(seatElement.booked)} >
                                        {seatElement.seat}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row >
            ));
        }, [seats]); //End rowElements

        useEffect(() => {
            setResult(
                <div>
                    <h3 className="text-center">{theater.name}</h3>
                    <br />
                    {rowElements}
                </div>
            );
        }, [rowElements]);

        return <>{result}</>
    }; //End ShowSeats

    return !seats ? null : (
        <Container className="mt-5">
            <Row>
                <Col className='d-flex justify-content-evenly'>
					<Link className="nav-back text-info" to="/StartView">Tillbaka</Link>
                    <CloseButton />
				</Col>
            </Row>

            <ShowSeats />

            <Row>
                <Col className="col-3 offset-4 mt-2">
                    <span style={{ fontSize: '22px' }}>Vuxen</span>
                </Col>
                <Col className="col-1 mt-2">
                    <p className="text-center">&nbsp;&nbsp;&nbsp;{tickets.ordinare}</p>
                </Col>
            </Row>
            <Row>
                <Col className="col-3 offset-4 mt-2">
                    <span style={{ fontSize: '22px' }}>Barn</span>
                </Col>
                <Col className="col mt-2">
                    <Button onClick={() => decreaseCount('barn')} variant="danger me-2">
                        --
                    </Button>
                    {tickets.child}&nbsp;
                    <Button onClick={() => increaseCount('barn')} variant="primary">
                        +
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="col-3 offset-4 mt-3">
                    <span style={{ fontSize: '22px' }}>Pensionär</span>
                </Col>
                <Col className="col mt-3">
                    <Button onClick={() => decreaseCount('pensionar')} variant="dark me-2">
                        –
                    </Button>
                    {tickets.retire}&nbsp;
                    <Button onClick={() => increaseCount('pensionar')} variant="primary">
                        +
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>E-postadress</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} placeholder="namn@exempel.com" onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Text id="passwordHelpBlock" muted>
                                För att kunna boka måste du ange en giltig e-postadress.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <span style={{ fontSize: '22px' }}>Summa: {summaState}</span>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <Button variant="secondary" onClick={sendRequest}>Bekräfta bokning</Button>{' '}
                </Col>
            </Row>
        </Container>
    );
};
export default TheaterView;