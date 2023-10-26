import { useState, useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
import { get } from '../utilsAndHooks/rest';
import BookingItem from '../components/BookingItem';

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
        <Container className="my-4 border border-light py-3 rounded-5 bg-info col-lg-8">
            <Row>
                <Col className="mx-auto text-center">
                    <h1>{user.name}</h1>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="mx-auto text-center">
                    <h3>Kommande bokningar</h3>
                    {bookings.upcoming.map((booking, index) => (
                        <BookingItem key={index} booking={booking} />
                    ))}
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="mx-auto text-center">
                    <h3>Tidigare bokningar</h3>
                    {bookings.past.map((booking, index) => (
                        <BookingItem key={index} booking={booking} />
                    ))}
                </Col>
            </Row>
        </Container>
    );
}