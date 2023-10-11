import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function RegisterView() {
    return (
        <>
            <Container>
                <Col className="mx-auto text-center">
                    <Image src="/img/logo/filmvisarna-logo-icon.png" roundedCircle style={{ width: '100px', height: '100px' }} />
                </Col>
                <h1 className="text-center">Bli Medlem</h1>
                <Form className="mx-auto">
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Förnamn</Form.Label>
                        <Form.Control type="varchar" placeholder="Förnamn" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Efternamn</Form.Label>
                        <Form.Control type="varchar" placeholder="Efternamn" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>E-postadress</Form.Label>
                        <Form.Control type="email" placeholder="JoeDoe@email.se" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Lösenord</Form.Label>
                        <Form.Control type="Lösenord" placeholder="Password" />
                    </Form.Group>
                </Form>
            </Container>
            <Row className="justify-content-between">
                <Col className="mx-auto text-center d-grid">
                    <Button variant="primary" href="/LoginView" size="lg">
                        Bli medlem
                    </Button>
                </Col>
                <Col className="mx-auto text-center d-grid">
                    <Button variant="secondary link" href="/StartView" size="lg">
                        Avbryt
                    </Button>
                </Col>
            </Row>
        </>
    );
}


