import React from 'react';
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
					<option defaultValue="18">Åldersgräns</option>
					<option value="15">15</option>
					<option value="13">13</option>
					<option value="7">7</option>
				</select>
				</Col>
			</Row>

			<Row className="align-items-center">
				{movies.map(({ id, movie, images }) => 
					<Col className="col-6 col-lg-3 mb-4" key={id}>
						<Link to={`/MovieView/${id}`} className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
						<Card.Img className="top rounded ratio-6x9" alt={`${movie}`} src={`/img/poster/${images[0]}`} />
						<Card.Title className="text-center">{movie}</Card.Title>
						</Link>
					</Col>)}
			</Row>
		</>
	);
}

// 4.1 Skapa en navigationslänk där användaren kan välja att gå till detaljsidan för en specifik film [StartView]