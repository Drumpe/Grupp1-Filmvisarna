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
    <h2>Hämta bokningsdetaljer</h2>
      <label>Bokningsnummer: </label>
      <input type='text' placeholder='xxxxxx' onChange={
        (e) => filterBookings(e.target.value)}/>
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
          <p>Summa: {ticketSum} kr</p>
        </div>

      ))}
    </>

  );
}


