import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';



export default function AdminView() {
  const [bookings, setBookings] = useState({ bookings: [] });
  const [filteredBookings, setFilteredBooking] = useState([])

  useEffect(() => {
    (async () => {
      setBookings({
        ...bookings,
        bookings: await get(`bookings/detailedList/`)
      });
    })();
  }, []);

  const filterBookings = (bookingNumber) => {
    const filtered = bookings.bookings.filter((booking) => booking.bookingNumber === bookingNumber);
    setFilteredBooking(filtered);
  }
  let ticketSum = 0;

  return (
    <>
      <h1>Hämta bokningsdetaljer</h1>
      <hr />
      <br />
      <label>Bokningsnummer </label>
      <br />
      <input type='text' placeholder='xxxxxx' onChange={
        (e) =>
          filterBookings(e.target.value)} className='mt-3 mb-3 col-4 p-3' />
      {filteredBookings.map((booking, index) => (
        <div key={index}>
          {booking.firstName && booking.lastName ? (
            <p>Bokad av: {booking.firstName} {booking.lastName}</p>
          ) : null}
          
          <p>E-postadress: {booking.email} </p>
          <p>Film: {booking.movie} </p>
          <p>Salong: {booking.theater} </p>
          <p>Tid för visning: {(booking.screeningTime).replace('T', ' ').slice(0, -3)} </p>
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
    </>

  );
}


