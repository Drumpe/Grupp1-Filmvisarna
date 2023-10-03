import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function StartView() {

	const { movies } = useOutletContext();

	return (
		<>
			<Row>
				<Col>
				<h1 className="mb-4 text-primary d-inline-block">Visas nu</h1>
				<select className="form-select text-secondary me-2 w-auto d-inline-block float-end">
					<option value="18" selected>Åldersgräns</option>
					<option value="15">15</option>
					<option value="13">13</option>
					<option value="7">7</option>
				</select>
				</Col>
			</Row>

			<Row className="align-items-center">
				{movies.map(({ id, movie }) => 
					<Col className="col-6 col-lg-3" key={id}>
						<Link to={`/MovieView/${id}`} className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
						<Card.Img className="top rounded ratio-6x9" alt='Awake' src="/img/poster/awake.jpg" />
						<Card.Title className="text-center">{movie}</Card.Title>
						</Link>
					</Col>)}
			</Row>
		</>
	);
}