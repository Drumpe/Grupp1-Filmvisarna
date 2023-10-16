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
          <Container className="register-container">
            <Col className="mx-auto text-center">
              <Image src="/img/logo/filmvisarna-logo-icon.png" roundedCircle className="register-image" />
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
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="JoeDoe@email.se" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Telefonnummer</Form.Label>
                        <Form.Control type="varchar" placeholder="Telefonnummer" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </Container>
            <Col className="register-button mx-auto text-center">
        <Button variant="primary" href="/LoginView" size="lg" className="accept-button">
          Registera
        </Button>
        <Button variant="secondary link" href="/StartView" size="lg" className="cancel-button">
          Avbryt
        </Button>
      </Col>
        </>
    );
}


