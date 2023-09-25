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
                <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Antal platser:</Form.Label>
        <Form.Control type="email" placeholder="Ange antal" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      </Form>
                </Col>
            </Row>
<Row>
<Col className="d-flex justify-content-center">
   <Button variant="secondary">Genomför bokning</Button>{' '}
   </Col>
</Row>
      
        </Container>
    );
};

export default MyComponent;
