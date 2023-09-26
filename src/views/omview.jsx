
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Omview = () => {
    return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    <Image src="holder.js/171x180" thumbnail />
                </Col>
            </Row>
            <Row>
            <h1>Om oss</h1>
                <Col>
                    <p>
                        Välkommen till vår filmwebbplats! Vi brinner för film och vill dela vår kärlek till film med dig.
                    </p>
                    <p>
                        Vårt uppdrag är att förse dig med den senaste filmen och information om kommande släpp. Vi hoppas kunna hjälpa dig att upptäcka nya.
                    </p>
                    <p>
                        vårt team består av: Ola, Yassein, Patrik, Arsha, Albin, Jimmie
                    </p>
                    <Card className="mt-3">
                        <Card.Title>Kontat info</Card.Title>
                        <Card.Body>Filmvisarna@mail.com   <br /> 07000000 </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Omview;

