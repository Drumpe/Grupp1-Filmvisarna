import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, ListGroup } from 'react-bootstrap';
import { useOutletContext, useParams, Link} from 'react-router-dom';
import { get } from '../utilsAndHooks/rest';
import { capitalize, getSentenceDelimiter, getLocaleDateString, getLocaleTimeString } from '../utilsAndHooks/formatter';

function MovieView() {
	const { movies } = useOutletContext();
	let { movieId } = useParams();
	let [screenings, setScreenings] = useState({ screenings: [] });
	let [ movie, setMovie ] = useState(null);
	let [selectedScreening, setSelectedScreening] = useState('');

	// type casting
	movieId = +movieId;

	useEffect(() => {
		(async () => {
			setScreenings({
				...screenings,
				screenings: await get(`screenings/movie/${movieId}`)
			});
		})();
	}, []);

	useEffect(()=> {
		let movie = movies.find(movie => movie.id === movieId);
		setMovie(movie);
	}, [])

	if(!movies.length || !movie){ return null;}

	// Description
	const innerDescription = {__html:movie.description};
	const Description = () => {
		return <div className="mw-reading-len" dangerouslySetInnerHTML={innerDescription} />
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
				{`${getLocaleTimeString(screening.dateAndTime, { hour: `2-digit`, minute: `2-digit` })} | ${getLocaleDateString(screening.dateAndTime, { day: `numeric`, month: `long` })}, ${capitalize(getLocaleDateString(screening.dateAndTime, { weekday: `short`}))} | ${screening.theaterName}`}
			</ListGroup.Item>
			);

			return (times);
	}

	/// MovieCast
	const MovieCast = () => {
		

		let actors = movie.actors.map((actor, i) => 
			<p className="d-inline" key={i}>{actor}{getSentenceDelimiter(movie.actors, i)}</p> 
		);
			return actors;
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
								src={`https://www.youtube.com/embed/${movie.trailerURL}?autoplay=0&mute=1`}>
							</iframe>
						</div>
				</Col>
			</Row>
			<Row>
				<Col className='d-flex justify-content-start mt-3'>
					<h1 className="p-2">{movie.movie}</h1>
				</Col>
			</Row>
			<Row className="mb-3">
				<Col className="movie-information-container mt-4">
					<div className="w-100 p-2">
						
							<Description />
						
					</div>
					<div className="w-100 p-2">
						<span className="d-block movie-details mb-1"><h6 className="d-inline">Skådespelare: </h6> <MovieCast /></span>
						<span className="d-block movie-details mb-1"><h6 className="d-inline">Genre: </h6> <p className="d-inline">{movie.genre}</p></span>
						<span className="d-block movie-details mb-1"><h6 className="d-inline">Regissör: </h6> <p className="d-inline">{movie.director}</p></span>
					</div>
				</Col>
			</Row>


			{/* Vertically
			<Row>
				<Col className='d-flex justify-content-start'>
					<div className="w-100 mt-4 pb-2 mb-3">
						<span className="d-block movie-details mb-1"><h6 className="d-inline">Skådespelare: </h6> <MovieCast /></span>
						<span className="d-block movie-details mb-1"><h6 className="d-inline">Genre: </h6> <p className="d-inline">{movies[idx].genre}</p></span>
						<span className="d-block movie-details mb-1"><h6 className="d-inline">Regissör: </h6> <p className="d-inline">{movies[idx].director}</p></span>
					</div>
				</Col>
			</Row> */}

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
