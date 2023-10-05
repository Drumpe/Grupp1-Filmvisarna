import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { useOutletContext, useParams } from 'react-router-dom';

function MovieView() {
	const { movies } = useOutletContext();
	let { movieId } = useParams();

	if (movieId > 0) {
		movieId -= 1;
	}

	return (
		<Container >
			<Row>
				<Col className='d-flex justify-content-center'>
					<div className="w-100 ratio ratio-16x9">
							<iframe width="100%" height="100%"
								src={`https://www.youtube.com/embed/${movies[movieId].trailerURL}?autoplay=1&mute=1`}>
							</iframe>
						</div>
				</Col>
			</Row>
			<Row>
				<Col className=' d-flex justify-content-center'>
					<Card className='bg-transparent text-light' style={{ width: '25rem' }}>
						<Card.Body>
							<Card.Title>{movies[movieId].movie}</Card.Title>
							<Card.Text className='mt-3'>{movies[movieId].description}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col className=' d-flex justify-content-center' >
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Datum
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="#/action-1">29/9</Dropdown.Item>
							<Dropdown.Item href="#/action-2">01/10</Dropdown.Item>
							<Dropdown.Item href="#/action-3">02/10</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Col>
			</Row>
			<Row>
				<Col className=' d-flex justify-content-center'>
					<Card className='mt-2 bg-transparent text-light' style={{ width: '25rem' }}>
						<ListGroup variant="flush">
							<ListGroup.Item className='bg-transparent text-light'>Tid: 12:00 | Salong 1 </ListGroup.Item>
							<ListGroup.Item className='bg-transparent text-light'>Tid: 16:00 | Salong 2</ListGroup.Item>
						</ListGroup>
					</Card>
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

export default MovieView;