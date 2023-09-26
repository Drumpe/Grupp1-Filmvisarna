import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function StartView() {
return (
	<Container className="mt-5">
		<h1>Visas nu</h1>
		<Row className="align-items-center">
			<Col className='col-6 col-lg-3'>
				<Link to="/MovieView">
					<Card >
					<Card.Img variant="top rounded" alt='Awake' src="/poster_img/awake.jpg" />
					<Card.Title variant="text-center">Awake</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3' >
				<Link to="/MovieView">
					<Card >
					<Card.Img variant="top rounded" alt='A Mystery' src="/poster_img/a_mystery.jpg" />
					<Card.Title variant="text-center">A Mystery</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3' >
				<Link to="/MovieView">
					<Card >
					<Card.Img variant="top rounded" alt='Pulp Fiction' src="/poster_img/pulp_fiction.jpg" />
					<Card.Title variant="text-center" >Pulp Fiction</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3' >
				<Link to="/MovieView">
					<Card >
					<Card.Img variant="top rounded" alt='Tron' src="/poster_img/tron.jpg" />
					<Card.Title variant="text-center">TRON</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3'>
				<Link to="/MovieView">
					<Card >
					<Card.Img variant="top rounded" alt='The shawshank redemption' src="/poster_img/the_shawshank_redemption.jpg" />
					<Card.Title variant="text-center">The shawshank redemption</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3'>
				<Link to="/MovieView">
					<Card >
					<Card.Img variant="top rounded" alt='The shining' src="/poster_img/the_shining.jpg" />
					<Card.Title variant="text-center">The shining</Card.Title>
					</Card>
				</Link>
			</Col>
		</Row>
	</Container>
);
}