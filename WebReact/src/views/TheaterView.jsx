import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button, CloseButton, Form } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';


const TheaterView = () => {
    const [movieInfo, setMovieInfo] = useState(null);
  
    useEffect(() => {
      (async () => {
        try {
          const movieData = await getMovie();
          setMovieInfo(movieData);
        } catch (error) {
          console.error('Error fetching movie details:', error);
          setMovieInfo(null);
        }
      })();
    }, []);
  
    const getMovie = async () => {
      try {
        const response = await fetch('/movies'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const movieData = await response.json();
        return movieData;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    };
  
    return (
      <Container>
        <Row>
          <Col>
            <Card>
              {movieInfo ? (
                <>
                  <Card.Img variant="top" src={movieInfo.image} />
                  <Card.Body>
                    <Card.Title>{movieInfo.name}</Card.Title>
                    <Card.Text>
                      Salongsnamn: {movieInfo.salong}
                      <br />
                      Tid: {movieInfo.time}
                      <br />
                      Datum: {movieInfo.date}
                    </Card.Text>
                  </Card.Body>
                </>
              ) : (
                <Card.Body>
                  <Card.Text>Loading movie information...</Card.Text>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
 


const MyComponent = () => {
    const [barnTickets, setBarnTickets] = useState(0);
    const [ordinareTickets, setOrdinareTickets] = useState(0);
    const [pensionarTickets, setPensionarTickets] = useState(0);

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
        const [id, setId] = useState(1);

        useEffect(() => {
            async function fetchData() {
                try {
                    var jsonString = await get('theaters/' + id);
                    var seatsArray = jsonString.seats; // seatsArray[0] SeatId, [1] Seat, [2] Row , [3] Kanske blir bokad

                    // Organisera seats by rows
                    const rows = {};
                    seatsArray.forEach((element) => {
                        if (!rows[element.row]) {
                            rows[element.row] = [];
                        }
                        rows[element.row].push(element);
                    });

                    const rowElements = Object.keys(rows).map((rowNumber) => (
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
                    setResult(
                        <div>
                            <h3 className="text-center">{jsonString.theater}</h3>
                            <br/>
                            {rowElements}
                        </div>
                    );
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }, []);
        return <>{result}</>
    }

    return (
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
export default MyComponent;