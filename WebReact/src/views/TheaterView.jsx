import React, { useState, useEffect, useMemo, useRef } from "react"
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button, CloseButton, Form } from 'react-bootstrap';
import { get, post } from '../utilsAndHooks/rest';
import { Link, useParams } from "react-router-dom";


const TheaterView = () => {
    const [barnTickets, setBarnTickets] = useState(0);
    const [ordinareTickets, setOrdinareTickets] = useState(0);
    const [pensionarTickets, setPensionarTickets] = useState(0);
    const { screeningId } = useParams();
    const [jsonTheater, setJsonTheater] = useState(null);
    const [jsonScreening, setJsonScreening] = useState(null);
    const [wantedSeats, setWantedSeats] = useState([]);
    const [summaState, setSummaState] = useState(0);
    const [formData, setFormData] = useState({ email: '' });
    //const [bookingJson, setBookingJson] = useState(null);
    //const [response, setResponse] = useState(null);

    /* TODO:
    *  toggle seat color in seatClicked
    */

    async function fetchAndInit() {
        try {
            var screeningJson = await get('screenings/' + screeningId);
            setJsonScreening(screeningJson);
            var theaterJson = await get('theaters/' + screeningJson.theaterId);
            return theaterJson;
        } catch (err) {
            console.log(err);
            return {};
        }
    };

    const sendRequest = async () => {
        /** Här borde göras kontroller innan vi skickar iväg och kolla att resultatet är ok */
        var booking = createBookingJson();
        var result = await post('bookings/', booking);
        //console.log("Last check: "  + result.bookingId );
        //setResponse(result); //Onödig?
        window.location.href = 'ConfirmedView/' + result.bookingId;
    };

    useEffect(() => {
        // Call the fetchAndInit function and set jsonTheater when the component mounts
        fetchAndInit().then((theaterJson) => {
            setJsonTheater(theaterJson);
        });
    }, []); // Empty dependency array to run the effect only once

    const increaseCount = (category) => {
        switch (category) {
            case 'barn':
                setBarnTickets(barnTickets + 1);
                checkVarAv();
                break;
            case 'ordinare': //Kan tas bort
                setOrdinareTickets(ordinareTickets + 1);
                checkVarAv();
                break;
            case 'pensionar':
                setPensionarTickets(pensionarTickets + 1);
                checkVarAv();
                break;
            default:
                break;
        }
    };

    const decreaseCount = (category) => {
        switch (category) {
            case 'barn':
                if (barnTickets > 0) {
                    setBarnTickets(barnTickets - 1);

                    checkVarAv();
                }
                break;
            case 'ordinare': //Kan tas bort
                if (ordinareTickets > 0) {
                    setOrdinareTickets(ordinareTickets - 1);
                    checkVarAv();
                }

                break;
            case 'pensionar':
                if (pensionarTickets > 0) {
                    setPensionarTickets(pensionarTickets - 1);
                    checkVarAv();
                }
                break;
            default:
                break;
        }

    };
    //När man klickar på ett säte 
    const seatClicked = (seatId) => {
        // toggle wanted seat (toggla färg?)
        //Kontrollera att sätet inte är valt redan.

        //Om seatId in wantedSeats 

        if (wantedSeats.find(x => x.seatId === seatId)) {
            setWantedSeats((prevWantedSeats) => prevWantedSeats.filter(seat => seat.seatId !== seatId)); //Ta bort
        } else {
            setWantedSeats((prevWantedSeats) => [...prevWantedSeats, seatId]); //Lägg till
        }
        checkVarAv();
    }

    /* Skall kolla att Barn och Pensionärer inte överstiger antalet biljetter */
    const checkVarAv = () => {
        if (barnTickets + pensionarTickets > wantedSeats.length) {
            if (pensionarTickets > 0) {
                decreaseCount('pensionar');
            } else {
                decreaseCount('barn');
            }
        }
        raknaSumma();
    }

    // Räkna ut och set summaState som visas i body
    function raknaSumma() {
        //console.log("In raknaSumma:  B: " + barnTickets + " P: " + pensionarTickets + " V: " + wantedSeats.length);
        const barnPris = 80;
        const pensionarPris = 120;
        const vuxenPris = 140;
        setSummaState((barnTickets * barnPris) + (pensionarTickets * pensionarPris) + ((wantedSeats.length - barnTickets - pensionarTickets) * vuxenPris));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Access and use formData state for form submission
        console.log(formData);
        // You can send the data to an API or perform other actions here
    }
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function makePriceCatsArray() {
        var result = [];
        for (let index = 0; index < pensionarTickets; index++) {
            result.push(3);
        }
        for (let index = 0; index < barnTickets; index++) {
            result.push(2);
        }
        for (let index = 0; index < wantedSeats.length - barnTickets - pensionarTickets; index++) {
            result.push(1);
        }
        return result;
    }

    function createBookingJson() {
        var tmpArr = [];
        var priceCat = makePriceCatsArray();
        var index = 0;
        wantedSeats.map((tmpSeatId) => (
            tmpArr.push({ SeatId: tmpSeatId, PriceCategoryId: priceCat[index++] })
        ));
        const bookingData = {
            EmailAdress: formData.email,
            ScreeningId: screeningId,
            BookingXSeats: tmpArr,
        }
        //setBookingJson(bookingData); //returnerar istället
        return bookingData;
    }

    const ShowSeats = () => {
        const [result, setResult] = useState();
        var seatsArray = jsonTheater.seats; // seatsArray[0] SeatId, [1] Seat, [2] Row , [3] Kanske blir bokad
        const rowElements = useMemo(() => {
            // Organisera seats by rows
            const rows = {};
            seatsArray.forEach((element) => {
                if (!rows[element.row]) {
                    rows[element.row] = [];
                }

                //Här läggs till ett attribut till element, typ booked (boolean)
                // om seatsArray.SeatId finns i jsonScreening.bookedSeats 
                //  sätt element.booked till true annars false
                if (!jsonScreening.bookedSeats.find(x => x.seatId === element.seatId)) {
                    element.booked = true;
                } else {
                    element.booked = false;
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
                                    //Här skall läggas till onclick så att den (seatId) läggs till i en list med säten_som_skall_bokas
                                    //Färger borde fixas
                                    <Button onClick={() => seatClicked(seatElement.seatId)}
                                        variant={(seatElement.booked ? "primary" : "secondary") + " me-2 opacity-"}
                                        key={seatElement.seatId}
                                        disabled={(!seatElement.booked)} >
                                        {seatElement.seat}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row >
            ));
        }, [jsonTheater]); //End rowElements

        useEffect(() => {
            setResult(
                <div>
                    <h3 className="text-center">{jsonTheater.theater}</h3>
                    <br />
                    {rowElements}
                </div>
            );
        }, [rowElements]);
        return <>{result}</>
    }; //End ShowSeats

    //Räkna om summan om något värde ändras
    useEffect(() => {
        raknaSumma();
    }, [summaState, wantedSeats, barnTickets, pensionarTickets]);

    return !jsonTheater ? null : (
        <Container className="mt-5">
            <Row>
                <Col className="col-5 text-end">
                    <Button variant="outline-secondary">
                        Tillbaka
                    </Button>{' '}
                    <CloseButton />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mb-3 mt-3">
                </Col>
            </Row>

            <ShowSeats />

            <Row>
                <Col className="mt-3 d-flex justify-content-center">
                    <span style={{ fontSize: '25px' }}>Antal biljetter {wantedSeats.length} varav:</span>
                </Col>
            </Row>
            <Row>
                <Col className="col-3 offset-4">
                    <span style={{ fontSize: '22px' }}>Barn</span>
                </Col>
                <Col>
                    <Button onClick={() => decreaseCount('barn')} variant="danger me-2">
                        --
                    </Button>
                    {barnTickets}&nbsp;
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
                    <Button onClick={() => decreaseCount('pensionar')} variant="danger me-2">
                        --
                    </Button>
                    {pensionarTickets}&nbsp;
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
                            <Form.Control type="email" name="email" value={formData.email} placeholder="name@example.com" onChange={handleInputChange} />
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