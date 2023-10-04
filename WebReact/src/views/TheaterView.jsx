import React, { useState, useEffect, useMemo } from "react"
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button, CloseButton, Form } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';
import { Link, useParams } from "react-router-dom";


const TheaterView = () => {
    const [barnTickets, setBarnTickets] = useState(0);
    const [ordinareTickets, setOrdinareTickets] = useState(0);
    const [pensionarTickets, setPensionarTickets] = useState(0);
    let { screeningId } = useParams();
    const [jsonTheater, setJsonTheater] = useState(null); //() => fetchAndInit()

    async function fetchAndInit() {
        try {
            var screeningJson = await get('screenings/' + screeningId);
            var theaterJson = await get('theaters/' + screeningJson.theaterId);
            return theaterJson;
        } catch (err) {
            console.log(err);
            return {};
        } 
    };

    useEffect(() => {
        // Call the fetchAndInit function and set jsonTheater when the component mounts
        fetchAndInit().then((theaterJson) => {
          setJsonTheater(theaterJson);
          // Uncomment this line if you want to set seatsArray with theaterJson.seats
          // setSeatsArray(theaterJson.seats);
        });
      }, []); // Empty dependency array to run the effect only once

    const increaseCount = (category) => {
        switch (category) {
            case 'barn':
                setBarnTickets(barnTickets + 1);
                break;
            case 'ordinare':
                setOrdinareTickets(ordinareTickets + 1);
                break;
            case 'pensionar':
                setPensionarTickets(pensionarTickets + 1);
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
                }
                break;
            case 'ordinare':
                if (ordinareTickets > 0) {
                    setOrdinareTickets(ordinareTickets - 1);
                }

                break;
            case 'pensionar':
                if (pensionarTickets > 0) {
                    setPensionarTickets(pensionarTickets - 1);
                }
                break;
            default:
                break;
        }
    };

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
                rows[element.row].push(element);
            });
            return Object.keys(rows).map((rowNumber) => (
                <Row key={rowNumber}>
                    {/*<Col className="col-2">Rad {rowNumber}</Col>*/}
                    <Col className="d-flex justify-content-center">
                        <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                {rows[rowNumber].map((seatElement) => (
                                    <Button variant="secondary me-2" key={seatElement.seatId}>{seatElement.seat}</Button>
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
                    <span style={{ fontSize: '25px' }}>Välj antal biljetter</span>
                </Col>
            </Row>
            <Row>
                <Col className="col-3 offset-4">
                    <span style={{ fontSize: '22px' }}>Barn</span>
                </Col>
                <Col>
                    <Button onClick={() => increaseCount('barn')} variant="primary me-2">
                        +
                    </Button>
                    {barnTickets}&nbsp;
                    <Button onClick={() => decreaseCount('barn')} variant="danger">
                        --
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="col-3 offset-4 mt-3">
                    <span style={{ fontSize: '22px' }}>Ordinarie</span>
                </Col>
                <Col className="col mt-3">
                    <Button onClick={() => increaseCount('ordinare')} variant="primary me-2">
                        +
                    </Button>
                    {ordinareTickets}&nbsp;
                    <Button onClick={() => decreaseCount('ordinare')} variant="danger">
                        --
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="col-3 offset-4 mt-3">
                    <span style={{ fontSize: '22px' }}>Pensionär</span>
                </Col>
                <Col className="col mt-3">
                    <Button onClick={() => increaseCount('pensionar')} variant="primary me-2">
                        +
                    </Button>
                    {pensionarTickets}&nbsp;
                    <Button onClick={() => decreaseCount('pensionar')} variant="danger">
                        --
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email-adress</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Text id="passwordHelpBlock" muted>
                                För att kunna boka måste du ange en giltig mailadress.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <span style={{ fontSize: '22px' }}>Summa: </span>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <Link to='/ConfirmedView'>
                        <Button variant="secondary">Bekräfta bokning</Button>{' '}
                    </Link>

                </Col>
            </Row>
        </Container>
    );
};
export default TheaterView;