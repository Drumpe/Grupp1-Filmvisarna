import { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { getLocaleDateString } from '../utilsAndHooks/formatter';
import { get } from '../utilsAndHooks/rest';

export default function StartView() {

    const [{ movies }] = useOutletContext();
    const [selectedAge, setSelectedAge] = useState(18);  // Default age
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [screenings, setScreenings] = useState([]);
    const [date, setDate] = useState();
    const ref = useRef(null);
    const [screeningDatesScrollPosition, setScreeningDatesScrollPosition] = useState(0);


    useEffect(() => {
        fetchData();
        const filtered = movies.filter(movie => movie.ageLimit <= selectedAge);
        setFilteredMovies(filtered);
    }, [movies, selectedAge]);

    const handleAgeChange = (e) => {
        setSelectedAge(Number(e.target.value));
    };

    //Hämtar screenings
    const fetchData = async () => {
        var result = await get('Screenings')
        setScreenings(result);
    }

    // const addScreenings = () => {
    //     const array = [];
    //     for (let i = 0; i < movies.length; i++) {
    //         const movie = movies[i]
    //         array.push({ screening: movie.screening, id: movie.id })

    //     }
    //     return setScreenings(array)
    // }

    const scrollScreeningDatesForward = () => {
        const nextPos = screeningDatesScrollPosition + 250;
        ref.current?.scroll({ top: 0, left: nextPos, behavior: "smooth" });
        setScreeningDatesScrollPosition(nextPos);
    };

    const scrollScreeningDatesBackward = () => {
        const nextPos = screeningDatesScrollPosition - 250;
        nextPos < 250 ? 0 : nextPos;
        ref.current?.scroll({ top: 0, left: nextPos, behavior: "smooth" });
        setScreeningDatesScrollPosition(nextPos);
    };

    const showScreenings = () => {
        const uniqueDays = [];

        const filteredScreenings = screenings.filter((x) => {
            const today = new Date();
            const date = new Date(x.dateAndTime);

            const weekday = date.toLocaleDateString(date, { weekday: 'long' });

            //Kollar om veckodagen redan finns i UniqueDays array samt kollar om den dagen har passerat
            if (!uniqueDays.includes(weekday) && date >= today) {
                uniqueDays.push(weekday);
                return true;
            }
            return false;
        });
        return (
            <>
                <ListGroup.Item
                    className="rounded-bottom-0 w-100 pb-3"
                    variant="primary"
                    action
                    onClick={() => setDate(null)}>
                    Visa alla
                </ListGroup.Item>
                {filteredScreenings.map((s) => (
                    <ListGroup.Item
                        key={s.id}
                        className="rounded-bottom-0  w-100 pb-3"
                        variant="primary"
                        action
                        onClick={() => handleFilter(s.dateAndTime)}
                    >
                        {`${getLocaleDateString(s.dateAndTime, { month: 'numeric', day: 'numeric' })}
                - ${getLocaleDateString(s.dateAndTime, { weekday: 'long' })}`}
                    </ListGroup.Item>
                ))}
            </>

        );
    }

    const handleFilter = (dateAndTime) => setDate(dateAndTime);

    const sortedFilteredMovies = filteredMovies.filter((movie) => {
        if (date == null) {
            return movie
        }
        return movie.screening === date
    });



    return (
        <>
            <Row>
                <Col>
                    <h1 className="mb-4 text-primary d-inline-block">Visas nu</h1>
                    <Row>
                        <Col className="screening-dates d-flex justify-content-center">
                            <div ref={ref} className="w-100 overflow-x-scroll scrollbar-hidden">
                                {
                                    screeningDatesScrollPosition > 55 &&
                                    <div className="arrow-bg back-arrow" onClick={scrollScreeningDatesBackward}>
                                        <div className="back-arrow-container d-flex justify-content-start align-items-center h-100">
                                            <div className="back-arrow-content d-inline-flex justify-content-start align-items-center">
                                                <img className="arrow-scroll" src="/img/ui/ui-listgroup-backarrow.svg"></img>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    screenings.length > 0 &&
                                    <div className="arrow-bg forward-arrow" onClick={scrollScreeningDatesForward}>
                                        <div className="forward-arrow-container d-flex justify-content-end align-items-center h-100">
                                            <div className="forward-arrow-content d-inline-flex justify-content-end align-items-center">
                                                <img className="arrow-scroll" src="/img/ui/ui-listgroup-forwardarrow.svg"></img>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <ListGroup
                                    title="Dropdown button"
                                    variant="outline-secondary"
                                    className="border-bottom-0"
                                    horizontal>
                                    {showScreenings()}
                                </ListGroup >
                            </div>
                        </Col>
                    </Row>
                    <br />
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
                        <NavLink to={`/MovieView/${id}`} className="link-light link-underline-opacity-25 link-underline-opacity-75-hover">
                            <Card.Img className="top rounded ratio-6x9" alt={`${movie}`} src={`/img/poster/${images[0]}`} />
                            <Card.Title className="text-center">{movie}</Card.Title>
                        </NavLink>
                    </Col>)}
            </Row>
        </>
    );
}
