import { useState, useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
import { get, del} from '../utilsAndHooks/rest';
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

    function BookingItem({ booking, index, deleteBooking }) {
        const screeningTime = booking.screeningTime.replace('T', ' ').slice(0, -3);


        return (
            <p key={index}>
                "{booking.movie}" på {booking.theater},
                Tid: {screeningTime},
                Bokningsnummer: {booking.bookingNumber}
                <button onClick={() => deleteBooking(booking.bookingNumber, user.email)}>
                    Avboka
                </button>
            </p>
        );
    }

    async function deleteBooking(bookingNumber, userEmail) {
        try {
            await del(`Bookings/RemoveBooking/${bookingNumber}/${userEmail}`);
        } catch (error) {
            console.log("Error i borttag av bokning: ", error);
        }
        navigate("/");  
    }

    return (
        <Container className="my-4">
            <Row className="mt-5">
                <Col className="mx-auto text-center">
                    <h3>Kommande bokningar</h3>
                    {bookings.upcoming.map((booking, index) => (
                        <BookingItem key={index} booking={booking} deleteBooking={deleteBooking} />
                    ))}
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="mx-auto text-center">
                    <h3>Tidigare bokningar</h3>
                    {bookings.past.map((booking, index) => (
                        <BookingItem key={index} booking={booking} deleteBooking={deleteBooking} />
                    ))}
                </Col>
            </Row>

        </Container>
    );
}