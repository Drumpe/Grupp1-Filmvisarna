import { useState, useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
import { get } from '../utilsAndHooks/rest';

export default function AccountView() {
    const [{ user }] = useOutletContext();
    const [bookings, setBookings] = useState({ upcoming: [], past: [] });

    useEffect(() => {
        if (user && user.email) {
            (async () => {
                const userBookings = await get(`bookings/getbyemail/${user.email}`);
                const currentTime = new Date();

                const upcomingBookings = userBookings.filter((booking) => {
                    const screeningTime = new Date(booking.screeningTime);
                    return screeningTime > currentTime;
                });
                const pastBookings = userBookings.filter((booking) => {
                    const screeningTime = new Date(booking.screeningTime);
                    return screeningTime <= currentTime;
                });

                setBookings({ upcoming: upcomingBookings, past: pastBookings });
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
                    {bookings.upcoming.map((booking,index) => {
                        let screeningTime = booking.screeningTime.replace('T', ' ').slice(0, -3);
                        return (
                            <p key={index}>
                                {booking.movie} på {booking.theater},
                                Bokningsnummer: {booking.bookingNumber},
                                Tid: {screeningTime}
                            </p>
                        );
                    })}

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