import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';
import { useParams } from 'react-router-dom';
import { jsonDateToString } from '../utilsAndHooks/date-formatter';

export default function ConfirmedView() {
        let {bookingId} = useParams()
        const [data, setData] = useState({});
        const [seatfinder, setSeatFinder] = useState([]);
        const [formatedDate, setFormatedDate] = useState('');

        async function fetchData() {
               var response = await get('/bookings/' + bookingId);
               setData(response);
               setSeatFinder(response.tickets)      
        }

        useEffect(() => {
                fetchData();
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };            
                setFormatedDate(jsonDateToString(data.screeningTime, options, 'sv-SV'));
        },[data.screeningTime]);

return (
        <Container className="mt-5">
        <h1>Tack för din bokning!</h1>
        <hr />
        <br />
        <h3 className='text-decoration-underline'>{data.theater}</h3>
        <p>Antal:{" " + seatfinder.map(x => x.type).join(", ")}</p>
        <p>När: {formatedDate}</p>
        <p>Plats: <em>{data.theater}, rad: {seatfinder.map(x => x.row)}, plats: {seatfinder.map(x => x.seat)}</em></p>
        <p>Bokningsnummer: <em>{data.bookingNumber}</em></p>
        <p>Bekräftelsepost har skickats till <em>{data.email}</em></p>
        <br />
        <hr />
        <p>Vänligen uppge bokningsnummer i kassan vid betalning</p>

        <p>Varmt välkommen till oss för att se din bokade film.</p>        
        </Container>    
        );

}