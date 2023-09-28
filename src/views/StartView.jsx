import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function StartView() {
return (
	<Container className="mt-5">
		<h1 className="mb-2 text-primary">Visas nu</h1>
		<Row className="align-items-center">
			<Col className='col-6 col-lg-3'>
				<Link to="/MovieView" className="link-light">
					<Card >
					<Card.Img variant="top rounded" alt='Awake' src="/public/img/poster/awake.jpg" />
					<Card.Title variant="text-center">Awake</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3' >
				<Link to="/MovieView" className="link-light">
					<Card >
					<Card.Img variant="top rounded" alt='A Mystery' src="/public/img/poster/a_mystery.jpg" />
					<Card.Title variant="text-center">A Mystery</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3' >
				<Link to="/MovieView" className="link-light">
					<Card >
					<Card.Img variant="top rounded" alt='Pulp Fiction' src="/public/img/poster/pulp_fiction.jpg" />
					<Card.Title variant="text-center" >Pulp Fiction</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3' >
				<Link to="/MovieView" className="link-light">
					<Card >
					<Card.Img variant="top rounded" alt='Tron' src="/public/img/poster/tron.jpg" />
					<Card.Title variant="text-center">TRON</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3'>
				<Link to="/MovieView" className="link-light">
					<Card >
					<Card.Img variant="top rounded" alt='The shawshank redemption' src="/public/img/poster/the_shawshank_redemption.jpg" />
					<Card.Title variant="text-center">The shawshank redemption</Card.Title>
					</Card>
				</Link>
			</Col>
			<Col className='col-6 col-lg-3'>
				<Link to="/MovieView" className="link-light">
					<Card >
					<Card.Img variant="top rounded" alt='The shining' src="/public/img/poster/the_shining.jpg" />
					<Card.Title variant="text-center">The shining</Card.Title>
					</Card>
				</Link>
			</Col>
		</Row>
	</Container>
);
}