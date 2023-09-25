import Nav from 'react-bootstrap/Nav';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
return (
	<Container className="mt-5">
			<Row>
					<Col>
					<h5></h5>
					{/* <Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link></Nav.Link>
						</Nav> */}
						<p>&copy; 2023 Filmvisarna</p>
					</Col>
			</Row>
	</Container>
); 
}