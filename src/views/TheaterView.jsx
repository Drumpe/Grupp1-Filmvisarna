import React from 'react';
import { Container, Row, Col, ButtonToolbar, ButtonGroup, Button, CloseButton, Form } from 'react-bootstrap';

const MyComponent = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col className="col-4 text-end">
                    <CloseButton />
                </Col>
                <Col className="col-5 text-end">
                    <Button variant="outline-secondary">
                        Tillbaka
                    </Button>{' '}
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mb-3">

                    <h1>Salongsvy</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <div className="button-container">
                        <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <div className="button-container">
                        <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <div className="button-container">
                        <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <div className="button-container">
                        <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <div className="button-container">
                        <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <div className="button-container">
                        <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                                <Button variant="secondary me-2">O</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    Välj typ av biljett
                    <Form.Select aria-label="Default select example">
                        <option>Biljettyp</option>
                        <option value="1">Normal (140 kr)</option>
                        <option value="2">Barn (80 kr)</option>
                        <option value="3">Pensionär (120 kr)</option>
                    </Form.Select>
                    <Button variant="secondary mt-1">Lägg till</Button>{' '}
                     Antal biljetter: (x) st | Totalpris: (x) kr
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
                <Col className="d-flex justify-content-center">
                    <Button variant="secondary">Bekräfta bokning</Button>{' '}
                </Col>
            </Row>

        </Container>
    );
};
export default MyComponent;
