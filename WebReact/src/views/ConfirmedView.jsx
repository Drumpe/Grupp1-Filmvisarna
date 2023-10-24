import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';
import { useParams } from 'react-router-dom';
import { getLocaleDateString } from '../utilsAndHooks/formatter';

export default function ConfirmedView() {
	let { bookingId } = useParams()
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

	const ticketAmount = Object.entries(countTicketTypes(seatfinder)).map(([key, val]) => <li className="details" key={key}> {val} biljett av typ {key} </li>)

	useEffect(() => {
		fetchData();
		const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
		setFormatedDate(getLocaleDateString(data.screeningTime, options));
	}, [data.screeningTime]);

	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1 className="mb-3">Bokningsbekräftelse</h1>
						<h4 className="mb-3">Tack för din bokning!</h4>
					</Col>
				</Row>

				<Row>
					<Col className="mt-4 mb-1">
						<p className="mb-2">Bokningsnummer:</p>
						<h1 className="">{data.bookingNumber}</h1>
					</Col>
				</Row>

				<Row>
					<Col className="mt-4 p-2 pb-0">
						<Card className="p-4 w-75">
							<Card.Body>
								<Card.Title><h3 className='text-decoration-underline mb-4'>{data.theater}</h3></Card.Title>
								<Card.Text>
									<h5 className="mb-4">Film: <strong>{data.movie}</strong></h5>
									<span className="d-block movie-details mb-2"><h6 className="d-inline">När: </h6> {formatedDate}</span>
									<span className="d-block movie-details mb-2"><h6 className="d-inline">Salong: </h6> {data.theater}</span>
									<p className='movie-details mb-2'><h6>Antal biljetter:</h6> {ticketAmount}</p>
									<span className="d-block movie-details mb-1"><h6 className="d-inline">Platser: </h6> {seatfinder.map((x) =>
										<li className="details" key={x.seatId}>Rad {x.row}, stol {x.seat}</li>)}
									</span>
									<p className="mt-4">Alla bokningsdetaljer har skickats med epost till <em>{data.email}</em>.</p>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col>
						<hr />
						<p>Vänligen uppge bokningsnummer i kassan vid betalning.</p>
						<p>Varmt välkommen till oss för att se din bokade film.</p>
					</Col>
				</Row>
			</Container >
		</>
	);

}