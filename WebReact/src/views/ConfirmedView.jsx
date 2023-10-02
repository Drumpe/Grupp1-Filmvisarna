import { Container, Row, Col } from 'react-bootstrap';

export default function ConfirmedView() {
return (
	<Container className="mt-5">
        <h1>Tack för din bokning!</h1>
        <hr />
        <br />
        <h3 className='text-decoration-underline'>Terminator 4</h3>
        <p>Antal: <em>1 vuxen biljett</em> och <em>1 pensionärs biljett</em></p>
        <p>När: <em>Söndagen den 1 April 2024 klockan 19:30</em></p>
        <p>Plats: <em>Stora salongen, rad 4, stol 7 och 8</em></p>
        <p>Bokningsnummer: <em>16H-E8A</em></p>
        <p>Bekräftelsepost har skickats till <em>kund@mail.se</em></p>
        <br />
        <hr />
        <p>Vänligen uppge bokningsnummer i kassan vid betalning</p>

        <p>Varmt välkommen till oss för att se din bokade film.</p>        
	</Container>
);
}