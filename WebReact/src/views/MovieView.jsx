import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, ListGroup } from 'react-bootstrap';
import { useOutletContext, useParams, NavLink } from 'react-router-dom';
import { get } from '../utilsAndHooks/rest';
import { getSentenceDelimiter, getLocaleTimeString, compareScreeningDate, displayScreeningDate } from '../utilsAndHooks/formatter';


function MovieView() {
    const [{ movies }] = useOutletContext();
    let { movieId } = useParams();
    const [screenings, setScreenings] = useState([]);
    const [movie, setMovie] = useState(null);
    const [screeningDate, setScreeningDate] = useState(``);
    const [filteredScreenings, setFilteredScreenings] = useState([]);
    const [selectedScreening, setSelectedScreening] = useState('');
    const ref = useRef(null);
    const [screeningDatesScrollPosition, setScreeningDatesScrollPosition] = useState(0);

    // Type cast: string to number
    movieId = +movieId;

    /// Set dependencies
    useEffect(() => {
        let movie = movies.find(movie => movie.id === movieId);
        setMovie(movie);
    }, [])

    useEffect(() => {
        return (async function () {
            let data = await get(`screenings/movie/${movieId}`);
            let screenings = data.screenings;
            setScreenings(screenings);
        })
    }, []);

    useEffect(() => {
        const screeningsFromScreeningDate = screenings.filter((screening) => {
            const date = compareScreeningDate(screening.dateAndTime);
            if (date === screeningDate) { return true; }
            return false;
        });
        setFilteredScreenings(screeningsFromScreeningDate);
    }, [screenings, screeningDate])

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

    /// Dependency check
    if (!movies.length || !movie) { return null; }

    const Description = () => {
        const inner = movie.description;
        const expression = /<p>(...+)<\/p>/
        const description = inner.split(expression);
        description.forEach((sentence) => <p>{sentence}</p>);
        return description;
    }

    const MovieCast = () => {
        let actors = movie.actors.map((actor, i) =>
            <p className="d-inline" key={i}>{actor}{getSentenceDelimiter(movie.actors, i)}</p>
        );
        return actors;
    }

    /* SELECT VERSION
        const handleSetScreeningDate = (e) => {
        setScreeningDate(e.target.value);
    } */

    const ScreeningDateItems = () => {
        const uniqueDays = [];

        const filteredDays = screenings.filter((screening) => {
            const today = new Date();
            const date = new Date(screening.dateAndTime);
            const day = date.toDateString();

            if (!uniqueDays.includes(day) && date >= today) {
                uniqueDays.push(day);
                return true;
            }
            return false;
        });

        if (filteredDays[0] && !screeningDate) {
            setScreeningDate(compareScreeningDate(filteredDays[0].dateAndTime));
        }

        return (
            <>
                {filteredDays.map(({ i, dateAndTime }) =>
                    <ListGroup.Item key={i} className="rounded-bottom-0" variant="primary" active={compareScreeningDate(dateAndTime) === screeningDate} action onClick={() => {
                        if (compareScreeningDate(dateAndTime) !== screeningDate) {
                            setSelectedScreening('');
                            setScreeningDate(compareScreeningDate(dateAndTime));
                        }
                    }}>
                        {
                            `${displayScreeningDate(dateAndTime)}`
                        }
                    </ListGroup.Item >
                )
                }
            </>
        );

        /* SELECT VERSION
            const ScreeningDateItems = () => {
            const uniqueDays = [];
    
            const filteredDays = screenings.filter((screening) => {
                const today = new Date();
                const date = new Date(screening.dateAndTime);
                const day = date.toDateString();
    
                if (!uniqueDays.includes(day) && date > today) {
                    uniqueDays.push(day);
                    return true;
                }
                return false;
            });
    
            return (
                <>
                    {filteredDays.map(({ id, dateAndTime }) =>
                        <option key={id} value={getLocaleDateString(dateAndTime, { day: `numeric`, month: `numeric` })}>
                            {`${capitalize(getLocaleDateString(dateAndTime, { weekday: `short` }))}, ${getLocaleDateString(dateAndTime, { day: `numeric`, month: `long` })}`}
                        </option>
                    )}
                </>
            ); */
    }

    const SelectedScreeningItems = () => {
        let times = filteredScreenings.map(screening =>
            <ListGroup.Item variant="secondary" key={screening.id} className="screening-list-item" as="li" active={selectedScreening === screening.id} action onClick={() => {
                setSelectedScreening('');
                if (selectedScreening !== screening.id) {
                    setSelectedScreening(screening.id);
                }
            }}>
                {`${getLocaleTimeString(screening.dateAndTime, { hour: `2-digit`, minute: `2-digit` })} ${screening.theaterName}`}
            </ListGroup.Item>
        );

        return (times.length > 0 ? times : <p className="mt-2 mb-2">Inga visningar hittades för det valda datumet.</p>);
    }

    return !screenings ? null : (
        <Container >
            <Col className='d-flex justify-content-start'>
                <NavLink className="nav-back text-info" to="/StartView">Tillbaka</NavLink>
            </Col>
            <Row>
                <Col className='d-flex justify-content-center mt-3'>
                    <div className="w-100 ratio ratio-16x9 mw-mh-lg">
                        <iframe width="100%" height="100%"
                            src={`https://www.youtube.com/embed/${movie.trailerURL}?autoplay=0&mute=1`}>
                        </iframe>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className='d-flex justify-content-start mt-3'>
                    <h1 className="p-2">{movie.movie}</h1>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="movie-information-container mt-4">
                    <div className="w-100 p-2">

                        <Description />

                    </div>
                    <div className="w-100 p-2">
                        <span className="d-block movie-details mb-1"><h6 className="d-inline">Skådespelare: </h6> <MovieCast /></span>
                        <span className="d-block movie-details mb-1"><h6 className="d-inline">Genre: </h6> <p className="d-inline">{movie.genre}</p></span>
                        <span className="d-block movie-details mb-1"><h6 className="d-inline">Regissör: </h6> <p className="d-inline">{movie.director}</p></span>
                    </div>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col>
                    <h5 className="pb-2 mb-0 fw-bold">Välj visning</h5>
                </Col>
            </Row>

            <Row>
                <Col className="screening-dates d-flex justify-content-center">
                    <div ref={ref} className="w-100 overflow-x-scroll scrollbar-hidden">
                        {
                            screeningDatesScrollPosition > 249 &&
                            <div className="screening-dates-arrow screening-dates-back-arrow" onClick={scrollScreeningDatesBackward}>
                                <div className="listgroup-back-arrow-container d-flex justify-content-start align-items-center h-100">
                                    <div className="listgroup-back-arrow-content d-inline-flex justify-content-start align-items-center">
                                        <img className="listgroup-arrow" src="/img/ui/ui-listgroup-backarrow.svg"></img>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            screenings.length > 0 &&
                            <div className="screening-dates-arrow screening-dates-forward-arrow" onClick={scrollScreeningDatesForward}>
                                <div className="listgroup-forward-arrow-container d-flex justify-content-end align-items-center h-100">
                                    <div className="listgroup-forward-arrow-content d-inline-flex justify-content-end align-items-center">
                                        <img className="listgroup-arrow" src="/img/ui/ui-listgroup-forwardarrow.svg"></img>
                                    </div>
                                </div>
                            </div>
                        }

                        <ListGroup className="border-bottom-0" horizontal>
                            <ScreeningDateItems />
                        </ListGroup>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col className=' d-flex justify-content-center'>
                    <div className="w-100 pb-3">
                        <ListGroup className="mb-2" variant="flush">
                            <SelectedScreeningItems />
                        </ListGroup>
                    </div>
                </Col>
            </Row>


            <Row>
                <Col className='d-flex justify-content-center'>
                    <NavLink style={{ pointerEvents: selectedScreening ? '' : 'none' }} to={`/TheaterView/${selectedScreening}`}>
                        <Button className='p-2 mt-2' variant="primary" disabled={
                            selectedScreening.length === 0}>
                            Välj platser
                        </Button>
                    </NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieView;