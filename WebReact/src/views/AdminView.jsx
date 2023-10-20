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

  return (<>

    <label>Bokningsnummer</label>
    <input type='text' placeholder='xxxxxx' onChange={
      (e) => filterBookings(e.target.value)} />
    {filteredBookings.map((booking, index) => (
      <div key={index}>
       

        </div>

    ))}
  </>

  );
}


