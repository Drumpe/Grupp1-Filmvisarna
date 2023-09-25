import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
return (
	<Container className="mt-5">
		<Row>
			<Col>
				<p>&copy; 2023 Filmvisarna</p>
			</Col>
		</Row>
	</Container>
); 
}