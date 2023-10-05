import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { useOutletContext, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get } from '../utilsAndHooks/rest';
import { capitalize } from '../utilsAndHooks/date-formatter';

function MovieView() {
	const { movies } = useOutletContext();
	let { movieId } = useParams();
	let [screenings, setScreenings] = useState({
    screenings: []
  });

	useEffect(() => {
		(async () => {
			setScreenings({
				...screenings,
				screenings: await get(`screenings/mov${movieId}`)
			});
		})();
	});

	const idx = Number.parseInt(movieId) - 1;

	// Description
	const innerDescription = {__html:movies[idx].description};
	const Description = () => {
		return <div dangerouslySetInnerHTML={innerDescription} />
	}


	/// ScreeningDateItems
	const ScreeningDateItems = () => {
		let items = screenings.screenings.screenings.map(screening =>
			<Dropdown.Item key={screening.id}>
				{`${capitalize(screening.dayOfWeek)}, ${screening.dayAndMonth}`}
				</Dropdown.Item>
			);

			return (items);
	}

	/// ScreeningPicker
	const ScreeningTimeItems = () => {
		let times = screenings.screenings.screenings.map(times => 
			<ListGroup.Item href={`#${times.id}`} key={times.id}>
				{`Tid: ${times.time} | ${times.theaterName}`}
			</ListGroup.Item>
			);

			return (times);
	}

	if (screenings.screenings.screenings === undefined || movies[idx] === undefined) {
		return null;
	} else {
			return (
				<Container >
					<Row>
						<Col className='d-flex justify-content-center'>
							<div className="w-100 ratio ratio-16x9">
									<iframe width="100%" height="100%"
										src={`https://www.youtube.com/embed/${movies[idx].trailerURL}?autoplay=0&mute=1`}>
									</iframe>
								</div>
						</Col>
					</Row>
					<Row>
						<Col className='d-flex justify-content-start'>
							<div className="w-75 mt-4 pb-2">
								<h1>{movies[idx].movie}</h1>
								<Description />
							</div>
						</Col>
					</Row>
					<Row>
						<Col className=' d-flex justify-content-start mb-3'>

							<Dropdown>
								<Dropdown.Toggle variant="secondary">Välj datum</Dropdown.Toggle>
		
								<Dropdown.Menu>
									<ScreeningDateItems />
								</Dropdown.Menu>
							</Dropdown>

						</Col>
					</Row>

					<Row>
						<Col className=' d-flex justify-content-center'>

							<div className="w-100 pb-3">
								<ListGroup variant="flush">
									<ScreeningTimeItems />
								</ListGroup>
							</div>
						</Col>
					</Row>
					<Row>
						<Col className=' d-flex justify-content-center'>
							<Link to='/TheaterView'>
								<Button className=' mt-2' variant="primary" style={{ width: '25rem' }}>
									Välj visning
								</Button>{''}
							</Link>
						</Col>
					</Row>
				</Container>
			);
		}
	}

	

export default MovieView;