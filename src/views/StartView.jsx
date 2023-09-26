import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function StartView() {
return (
	<Container className="mt-5">
		<h1>Visas nu</h1>
		<Row>
			<Col>
				<Link to="/MovieView">
					<Card style={{  }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
					</Card.Body>
					<Card.Title>Card Title</Card.Title>
					</Card>
				</Link>
				<Link to="/MovieView">
					<Card style={{  }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
					</Card.Body>
					<Card.Title>Card Title</Card.Title>
					</Card>
				</Link>
			</Col>

			<Col>
			<Link to="/MovieView">
					<Card style={{  }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
					</Card.Body>
					<Card.Title>Card Title</Card.Title>
					</Card>
				</Link>
				<Link to="/MovieView">
					<Card style={{  }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
					</Card.Body>
					<Card.Title>Card Title</Card.Title>
					</Card>
				</Link>
			</Col>
		</Row>
	</Container>
);
}