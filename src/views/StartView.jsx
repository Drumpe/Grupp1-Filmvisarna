import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

export default function StartView() {
return (
	<Container className="mt-5">
		<h1>Visas nu</h1>
		<Row>
			<Col>
				<a href="/om">
					<Card style={{  }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
					</Card.Body>
					<Card.Title>Card Title</Card.Title>
					</Card>
				</a>

				<a href="/test">
					<Card style={{  }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
					</Card.Body>
					<Card.Title>Card Title</Card.Title>
					</Card>
				</a>
			</Col>

			<Col>
				<a href="#">
					<Card style={{  }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
					</Card.Body>
					<Card.Title>Card Title</Card.Title>
					</Card>
				</a>

				<a href="#">
					<Card style={{  }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
					</Card.Body>
					<Card.Title>Card Title</Card.Title>
					</Card>
				</a>
			</Col>
		</Row>
	</Container>
);
}