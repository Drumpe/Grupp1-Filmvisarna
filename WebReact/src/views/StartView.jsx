import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function StartView() {
  // En array med filmdata (ID och posterlänk) för att generera länkarna
  const movies = [
    { id: 1, title: 'Awake', poster: '/img/poster/awake.jpg' },
    { id: 2, title: 'A Mystery', poster: '/img/poster/a_mystery.jpg' },
    { id: 3, title: 'Pulp Fiction', poster: '/img/poster/pulp_fiction.jpg' },
    { id: 4, title: 'TRON', poster: '/img/poster/tron.jpg' },
    { id: 5, title: 'The Shawshank Redemption', poster: '/img/poster/the_shawshank_redemption.jpg' },
    { id: 6, title: 'The Shining', poster: '/img/poster/the_shining.jpg' },
  ];

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
        {movies.map((movie) => (
          <Col key={movie.id} className='col-6 col-lg-3'>
            <Link
              to={`/MovieView/${movie.id}`} // Använd filmens ID som en parameter i URL:en
              className="link-light link-underline-opacity-25 link-underline-opacity-75-hover"
            >
              <Card>
                <Card.Img className="top rounded ratio-6x9" alt={movie.title} src={movie.poster} />
                <Card.Title className="text-center">{movie.title}</Card.Title>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

// 4.1 Skapa en navigationslänk där användaren kan välja att gå till detaljsidan för en specifik film [StartView]