
import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export default function AccountView() {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src="holder.js/171x180" thumbnail />
                    </Col>
                    <Col xs={6} md={8}>
                        <h1 className="text-right">Username</h1>
                    </Col>
                </Row>
            </Container>
            <div className="bookings">
                <div className="current-bookings">
                    <h3>Current Bookings</h3>
                    <p>Movie 1</p>
                    <p>Movie 2</p>
                    <p>Movie 3</p>
                </div>
            </div>

            <div className="past-bookings text-center">
                <h3>Past Bookings</h3>
                <p>Movie 1</p>
                <p>Movie 2</p>
                <p>Movie 3</p>
            </div>
        </>
    );
}