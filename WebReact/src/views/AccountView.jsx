
import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";

export default function AccountView() {
    const [{ user }] = useOutletContext();

    //Hämta bokningar

    //Vilka bokningar har varit och vilka är kommande?

    return (
       <Container className="my-4">
            <Row>
                <Col className="mx-auto text-center">
                    <h1>{user.name}</h1> 
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="mx-auto text-center">
                    <h3>Kommande bokningar</h3>
                    <p>Film 1</p>
                    <p>Film 2</p>
                    <p>Film 3</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="past-bookings text-center">
                    <h3>Tidigare bokningar</h3>
                    <p>Film 1</p>
                    <p>Film 2</p>
                    <p>Film 3</p>
                </Col>
            </Row>
         </Container>     
    );
}