
import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export default function AccountView() {
    return (
       <Container className="my-4">
            <Row>
                <Col className="mx-auto text-center">
                    <h1>Förnamn Efternamn</h1> 
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