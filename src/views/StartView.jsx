import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function StartView() {
	return (
		<>
			<Row>
				<Col>
				<h1 className="mb-2 text-primary d-inline-block">Visas nu</h1>
				<select className="form-select text-secondary me-2 w-auto d-inline-block float-end">
					<option value="18" selected>Åldersgräns</option>
					<option value="15">15</option>
					<option value="13">13</option>
					<option value="7">7</option>
				</select>
				</Col>
			</Row>
			<Row className="align-items-center">
				<Col className='col-6 col-lg-3'> 
					<Link to="/MovieView" className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
						<Card>
							<Card.Img className="top rounded ratio-6x9" alt='Awake' src="/img/poster/awake.jpg" />
							<Card.Title className="text-center">Awake</Card.Title>
						</Card>
					</Link>
				</Col>
				<Col className='col-6 col-lg-3' >
					<Link to="/MovieView" className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
						<Card>
							<Card.Img className="top rounded ratio-6x9" alt='A Mystery' src="/img/poster/a_mystery.jpg" />
							<Card.Title className="text-center">A Mystery</Card.Title>
						</Card>
					</Link>
				</Col>
				<Col className='col-6 col-lg-3' >
					<Link to="/MovieView" className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
						<Card>
							<Card.Img className="top rounded ratio-6x9" alt='Pulp Fiction' src="/img/poster/pulp_fiction.jpg" />
							<Card.Title className="text-center" >Pulp Fiction</Card.Title>
						</Card>
					</Link>
				</Col>
				<Col className='col-6 col-lg-3' >
					<Link to="/MovieView" className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
						<Card>
							<Card.Img className="top rounded ratio-6x9" alt='Tron' src="/img/poster/tron.jpg" />
							<Card.Title className="text-center">TRON</Card.Title>
						</Card>
					</Link>
				</Col>
				<Col className='col-6 col-lg-3'>
					<Link to="/MovieView" className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
						<Card>
							<Card.Img className="top rounded ratio-6x9" alt='The shawshank redemption' src="/img/poster/the_shawshank_redemption.jpg" />
							<Card.Title className="text-center">The shawshank redemption</Card.Title>
						</Card>
					</Link>
				</Col>
				<Col className='col-6 col-lg-3'>
					<Link to="/MovieView" className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
						<Card>
							<Card.Img className="top rounded ratio-6x9" alt='The shining' src="/img/poster/the_shining.jpg" />
							<Card.Title className="text-center">The shining</Card.Title>
						</Card>
					</Link>
				</Col>
			</Row>
		</>
	);
}