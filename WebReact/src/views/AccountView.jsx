import {useState, useEffect} from "react";
import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
import { get } from '../utilsAndHooks/rest';

export default function AccountView() {
    const { movies, user } = useOutletContext();
    let email = user.email;
    let [bookings, setBookings] = useState({ bookings: [] });

    useEffect(() => {
        if (user && user.email) {
            (async () => {
                setBookings({
                    ...bookings,
                    bookings: await get(`bookings/getbyemail/${user.email}`)
                });
            })();
        }
    }, [user]);
       
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