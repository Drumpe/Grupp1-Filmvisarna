import React, { useEffect, useState } from 'react'; // Import React
import { Col, Container, Row, Image } from 'react-bootstrap'; // Import Image from react-bootstrap
import { get } from '../utilsAndHooks/rest';

export default function AdminView() {
  const [bookings, setBookings] = useState({ bookings: [] });
  const [filteredBookings, setFilteredBooking] = useState([]);

  useEffect(() => {
    (async () => {
      setBookings({
        ...bookings,
        bookings: await get(`bookings/detailedList/`),
      });
    })();
  }, []);

  const filterBookings = (bookingNumber) => {
    const filtered = bookings.bookings.filter((booking) => booking.bookingNumber === bookingNumber);
    setFilteredBooking(filtered);
  };
  let ticketSum = 0;

  return (
    <Container className='row mx-auto d-flex justify-content-center'>
      <div className='py-3 rounded-3 bg-info col-lg-8 mt-5 bg-opacity-75'>
        <Col className="mx-auto text-center d-none d-lg-block">
          <Image src="/img/logo/filmvisarna-logo-icon.png" roundedCircle style={{ width: '100px', height: '100px' }} />
        </Col>
        <div className="d-flex justify-content-around">

          <h1>Administatör</h1>
        </div>
        <div className="d-flex justify-content-around mt-3">
          <h4>Hämta bokningsinformation </h4>
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <input
            type='text'
            placeholder='xxxxxx'
            onChange={(e) => filterBookings(e.target.value)}
            className='mb-3 col-4 p-3'
          />

        </div>

        <div className="d-flex justify-content-around">
          {filteredBookings.map((booking, index) => (
            <div key={index}>
              {booking.firstName && booking.lastName ? (
                <p>Bokad av: {booking.firstName} {booking.lastName}</p>
              ) : null}

              <p>E-postadress: {booking.email} </p>
              <p>Film: {booking.movie} </p>

              <p>Salong: {booking.theater} </p>
              <p>Tid för visning: {booking.screeningTime.replace('T', ' ').slice(0, -3)} </p>

              <p><b>Biljetter:</b></p>
              {booking.tickets.map((ticket, ticketIndex) => {
                ticketSum += ticket.price; // Update ticketSum with the ticket price
                return (
                  <li key={ticketIndex}>
                    {ticket.type}biljett, {ticket.price}kr
                    <p>rad: {ticket.row}, stol {ticket.seat}</p>
                  </li>
                );
              })}
              <p>Total kostnad: {ticketSum} kr</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
