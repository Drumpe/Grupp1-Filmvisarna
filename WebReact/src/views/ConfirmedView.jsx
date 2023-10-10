import { useEffect, useState } from 'react';
import { Container} from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';
import { useParams } from 'react-router-dom';
import { jsonDateToString } from '../utilsAndHooks/date-formatter';

export default function ConfirmedView() {
        let {bookingId} = useParams()
        const [data, setData] = useState({});
        const [seatfinder, setSeatFinder] = useState([]);
        const [formatedDate, setFormatedDate] = useState('');

        
        async function fetchData() {
               var response = await get('/bookings/detailed/' + bookingId);
               setData(response);
               setSeatFinder(response.tickets)      
        }

        function countTicketTypes(tickets) {
                const counts = {};
              
                tickets.forEach(function (ticket) {
                  const type = ticket.type;
                  counts[type] = (counts[type] || 0) + 1;
                });
              
                return counts;
              }
              
        const ticketAmount = Object.entries(countTicketTypes(seatfinder)).map(([key, val]) => <li key={key}>{val} {key} biljett </li>)

        useEffect(() => {
                fetchData();
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };            
                setFormatedDate(jsonDateToString(data.screeningTime, options, 'sv-SV'));
        },[data.screeningTime]);

return (
        <Container className="mt-5">
        <h1>Tack för din bokning!</h1>
        <h5>Film: {data.movie}</h5>
        <hr />
        <br />
        <h3 className='text-decoration-underline'>{data.theater}</h3>
        <p className='ticket-type-list'>Antal bilijeter: {ticketAmount}</p>
        <p>När: {formatedDate}</p>
        <p>Salong: {data.theater}</p>
        <p>Plats: {seatfinder.map((x) => <li key={x.seatId}>rad {x.row}, stol {x.seat}</li>)}</p>
        <p>Bokningsnummer: <em>{data.bookingNumber}</em></p>
        <p>Ett bekräftelsepost har skickats till <em>{data.email}</em></p>
        <br />
        <hr />
        <p>Vänligen uppge bokningsnummer i kassan vid betalning</p>

        <p>Varmt välkommen till oss för att se din bokade film.</p>        
        </Container>    
        );

}