import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';



export default function AdminView()
{
  const [bookings, setBookings] = useState({ bookings: [] });

  useEffect(() => {
    (async () => {
      setBookings({
        ...bookings,
        bookings: await get(`bookings/detailedList/`)
      });
    })();
  }, []);

  return (
    <Container >
      <Row>
        <Col className='mx-auto text-center'>
        <h1> hej</h1>
        </Col>
      </Row>
    </Container>
  );
}


