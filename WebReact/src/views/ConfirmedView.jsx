import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';
import { useParams } from "react-router-dom";

const ConfirmedView = () => {
  let { bookingId } = useParams();
  const [bookingInfo, setBookingInfo] = useState({});

  async function fetchBooking() {
    try {
      var booking = await get('bookings/' + bookingId);
      return booking;
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  useEffect(() => {
    fetchBooking().then((booking) => {
      setBookingInfo(booking)
    });
  }, []); // Empty dependency array to run the effect only once

  const whiteText = {
    color: 'white'
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={whiteText}>Tack för din bokning!</h2>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td style={whiteText}>Bokningsnummer</td>
                <td style={whiteText}>{bookingInfo.bookingNumber}</td>
              </tr>
              <tr>
                <td style={whiteText}>Förnamn</td>
                <td style={whiteText}>{bookingInfo.firstName}</td>
              </tr>
              <tr>
                <td style={whiteText}>Efternamn</td>
                <td style={whiteText}>{bookingInfo.lastName}</td>
              </tr>
              <tr>
                <td style={whiteText}>Email</td>
                <td style={whiteText}>{bookingInfo.email}</td>
              </tr>
              <tr>
                <td style={whiteText}>Film</td>
                <td style={whiteText}>{bookingInfo.movie}</td>
              </tr>
              <tr>
                <td style={whiteText}>Salong</td>
                <td style={whiteText}>{bookingInfo.theater}</td>
              </tr>
              <tr>
                <td style={whiteText}>Tid</td>
                <td style={whiteText}>{bookingInfo.screeningTime}</td>
              </tr>
              <tr>
                <td style={whiteText}>Biljetter</td>
                <td>
                  <ul style={whiteText}>
                    {bookingInfo.tickets && bookingInfo.tickets.map((ticket, index) => (
                      <li key={index} style={whiteText}>
                        Rad: {ticket.row}, Plats: {ticket.seat}, Biljettyp: {ticket.type}, Pris: {ticket.price} kr
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmedView;

