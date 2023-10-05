import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, ListGroup, Dropdown } from 'react-bootstrap';
import { useOutletContext, useParams, Link} from 'react-router-dom';
import { get } from '../utilsAndHooks/rest';
import { capitalize } from '../utilsAndHooks/date-formatter';

function MovieView() {
	const { movies } = useOutletContext();
	let { movieId } = useParams();
	let [screenings, setScreenings] = useState({ screenings: [] });
	let [selectedScreening, setSelectedScreening] = useState('');

	useEffect(() => {
		(async () => {
			setScreenings({
				...screenings,
				screenings: await get(`screenings/mov${movieId}`)
			});
		})();
	}, []);

	const idx = Number.parseInt(movieId) - 1;

	// Description
	const innerDescription = {__html:movies[idx].description};
	const Description = () => {
		return <div dangerouslySetInnerHTML={innerDescription} />
	}


	/// ScreeningDayPicker
	///  --- Work In Progress ---
	/* const ScreeningDateItems = () => {
		const validDays = [];
		screenings.screenings.screenings.map(days => {
				if (validDays.indexOf(days.dayAndMonth) === -1) {
						validDays.push(days)
				}
		});

		let items = validDays.map(screening =>
			<Dropdown.Item key={screening.id}>
				{`${capitalize(screening.dayOfWeek)}, ${screening.dayAndMonth}`}
				</Dropdown.Item>
			);

			return (items);

			// ALL DAYS
			let items = screenings.screenings.screenings.map(screening =>
			<Dropdown.Item key={screening.id}>
				{`${capitalize(screening.dayOfWeek)}, ${screening.dayAndMonth}`}
				</Dropdown.Item>
			);

			return (items);
	} */

	/// ScreeningPicker
	const ScreeningTimeItems = () => {
		let times = screenings.screenings.screenings.map(screening =>
			<ListGroup.Item variant="secondary" key={screening.id} className="screening-list-item" as="li" active={selectedScreening === screening.id} action onClick={() => {
				setSelectedScreening('');
				if (selectedScreening !==  screening.id) {
					setSelectedScreening(screening.id);
				}
			}}>
				{`${screening.time} | ${screening.dayAndMonth}, ${capitalize(screening.dayOfWeek)} | ${screening.theaterName}`}
			</ListGroup.Item>
			);

			return (times);
	}

	return !screenings.screenings.screenings ? null : (
		<Container >
			<Col className='d-flex justify-content-start'>
					<Link className="nav-back text-info" to="/StartView">Tillbaka</Link>
				</Col>
			<Row>
				<Col className='d-flex justify-content-center mt-3'>
					<div className="w-100 ratio ratio-16x9 mw-mh-lg">
							<iframe width="100%" height="100%"
								src={`https://www.youtube.com/embed/${movies[idx].trailerURL}?autoplay=0&mute=1`}>
							</iframe>
						</div>
				</Col>
			</Row>
			<Row>
				<Col className='d-flex justify-content-start'>
					<div className="w-100 mt-4 pb-2">
						<h1>{movies[idx].movie}</h1>
						<p className="mt-3">
							<Description />
						</p>
					</div>
				</Col>
			</Row>

			{/* <Row>
				<Col className=' d-flex justify-content-start mb-3'>

					<Dropdown>
						<Dropdown.Toggle variant="secondary">Välj datum</Dropdown.Toggle>

						<Dropdown.Menu>
							<ScreeningDateItems />
						</Dropdown.Menu>
					</Dropdown>

				</Col>
			</Row> */}

			<Row>
				<Col className=' d-flex justify-content-center'>

					<div className="w-100 pb-3">
						<h5 className="border-bottom pb-2 mb-0 fw-bold">Välj visning</h5>
						<ListGroup variant="flush">
							<ScreeningTimeItems />
						</ListGroup>
					</div>
				</Col>
			</Row>
			<Row>
				<Col className='d-flex justify-content-center'>
				<Link style={{pointerEvents: selectedScreening ? '' : 'none'}} to={`/TheaterView/${selectedScreening}`}>
						<Button className='p-2 mt-2' variant="primary" disabled={
			selectedScreening.length === 0}>
							Välj platser
						</Button>
				</Link>
				</Col>
			</Row>
		</Container>
	);
}

export default MovieView;