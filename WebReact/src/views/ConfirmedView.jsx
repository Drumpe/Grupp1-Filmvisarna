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
	const [sum, setSum] = useState(0);


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
		let sum = 0;
		seatfinder.forEach((ticket) => {
			sum += ticket.price;
		});
		setSum(sum);
	}, [seatfinder]);

	useEffect(() => {
		fetchData();
		const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
		setFormatedDate(getLocaleDateString(data.screeningTime, options));
	}, [data.screeningTime]);

	return (
		<>
			<Container>
				<Row>
					<Col className="mb-2">
						<h1 className="mb-3 text-primary">Bokningsbekräftelse</h1>
						<h5>Tack för din bokning!</h5>
					</Col>
				</Row>

				<Row>
					<Col className="mt-4">
						<p className="mb-2">Bokningsnummer:</p>
						<h1 className="">{data.bookingNumber}</h1>
					</Col>
				</Row>

				<Row>
					<Col className="mt-3 p-2 pb-0">
						<Card className="p-4 w-100 bg-gray-dark-transparent">
							<Card.Body>
								<h4 className='text-decoration-underline mb-4'>{data.theater}</h4>

								<h5 className="mb-4">Film: <strong>{data.movie}</strong></h5>
								<span className="d-block movie-details mb-2"><h6 className="d-inline">När: </h6> {formatedDate}</span>
								<span className="d-block movie-details mb-2"><h6 className="d-inline">Salong: </h6> {data.theater}</span>
								<p className='movie-details mb-2'><h6>Antal biljetter:</h6> {ticketAmount}</p>
								<span className="d-block movie-details mb-4"><h6 className="d-inline">Platser: </h6> {seatfinder.map((x) =>
									<li className="details" key={x.seatId}>Rad {x.row}, stol {x.seat}</li>)}
								</span>
								<h5 className="mt-4 text-light">Att betala: {sum} kr</h5>
								<p className="mt-3">Alla bokningsdetaljer har skickats med epost till <em>{data.email}</em>.</p>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col className="mt-4">
						<p>Vänligen uppge bokningsnummer <em>{data.bookingNumber}</em> i kassan vid betalning.</p>
						<p>Varmt välkommen till oss för att se din bokade film.</p>
					</Col>
				</Row>
			</Container >
		</>
	);

}