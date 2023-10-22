import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, DropdownButton, Stack, Dropdown, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { get } from '../utilsAndHooks/rest';
import { getLocaleDateString } from '../utilsAndHooks/formatter';

export default function StartView() {

    const { movies, user } = useOutletContext();
    const [selectedAge, setSelectedAge] = useState(18);  // Default age
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [screenings, setScreenings] = useState([]);
    const [date, setDate] = useState();
    useEffect(() => {
        fetchData();
        const filtered = movies.filter(movie => movie.ageLimit <= selectedAge);
        setFilteredMovies(filtered);
    }, [movies, selectedAge, screenings.dateAndTime]);

    const handleAgeChange = (e) => {
        setSelectedAge(Number(e.target.value));
    };

    const fetchData = async () => {
        var result = await get("Screenings")
        setScreenings(result);
    }

    const uniqueDays = [];

    const filteredScreenings = screenings.filter((x) => {
        const date = new Date(x.dateAndTime);
        const weekday = date.toLocaleDateString(date, { weekday: 'long' });

        if (!uniqueDays.includes(weekday)) {
            uniqueDays.push(weekday);
            return true;
        }

        return false;
    });

    const currentDateTime = new Date();

    //Filtrera bort datum som är smalare än de aktuella datumet
    const sortedFilteredScreenings = filteredScreenings
        .filter((screening) => {
            const date = new Date(screening.dateAndTime);
            return date >= currentDateTime;
        }).sort((a, b) => {
            //Sortera datum baserat från de närmsta datum till det aktuella
            const dateA = new Date(a.dateAndTime);
            const dateB = new Date(b.dateAndTime);
            return dateA - dateB;
        });

    const handleFilter = (dateAndTime) => {
        var date = new Date(dateAndTime)
        return setDate(date.toLocaleDateString("sv-SV"))
    }
    console.log(date);

    const sortedFilteredMovies = filteredMovies.filter(({ movie, screening }) => {
        if (date == null) {
            return movie
        }
        return screening == date
    });

    return (
        <>
            <Row>
                <Col>
                    <h1 className="mb-4 text-primary d-inline-block">Visas nu</h1>
                    <DropdownButton
                        title="Dropdown button"
                        variant="outline-secondary"
                        direction="horizontal"
                        gap={2}>
                        <Dropdown.Item onClick={() => setDate(null)}>Visa alla</Dropdown.Item>
                        {sortedFilteredScreenings.map(({ id, dateAndTime }) => (
                            <div key={id}>
                                <Dropdown.Item
                                    onClick={() => handleFilter(dateAndTime)}>
                                    {`${getLocaleDateString(dateAndTime, { month: 'numeric', day: 'numeric' })}
                                - ${getLocaleDateString(dateAndTime, { weekday: 'long' })}`}</Dropdown.Item>
                            </div>
                        ))}
                    </DropdownButton >
                    <select
                        className="form-select text-secondary me-2 w-auto d-inline-block float-end"
                        onChange={handleAgeChange}
                        value={selectedAge}
                    >
                        <option value="18">Åldersgräns</option>
                        <option value="18">18</option>
                        <option value="15">15</option>
                        <option value="13">13</option>
                        <option value="7">7</option>
                    </select>
                </Col>
            </Row>
            <br />
            <Row className="align-items-center">
                {sortedFilteredMovies.map(({ id, movie, images }) =>
                    <Col className="col-6 col-lg-3 mb-4" key={id}>
                        <Link to={`/MovieView/${id}`} className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
                            <Card.Img className="top rounded ratio-6x9" alt={`${movie}`} src={`/img/poster/${images[0]}`} />
                            <Card.Title className="text-center">{movie}</Card.Title>
                        </Link>
                    </Col>
                )}
            </Row>
        </>
    );
}
