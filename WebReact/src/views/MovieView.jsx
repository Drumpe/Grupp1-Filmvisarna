import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, ListGroup } from 'react-bootstrap';
import { useOutletContext, useParams, NavLink } from 'react-router-dom';
import { get } from '../utilsAndHooks/rest';
import { capitalize, getSentenceDelimiter, getLocaleDateString, getLocaleTimeString } from '../utilsAndHooks/formatter';


function MovieView() {
    const [{ movies }] = useOutletContext();
    let { movieId } = useParams();
    const [screenings, setScreenings] = useState([]);
    const [movie, setMovie] = useState(null);
    const [screeningDate, setScreeningDate] = useState(getLocaleDateString(new Date().toDateString(), { day: `numeric`, month: `numeric` }));
    const [filteredScreenings, setFilteredScreenings] = useState([]);
    const [selectedScreening, setSelectedScreening] = useState('');

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
            let screenings = data.screenings; //Alla säten i salongen 
            setScreenings(screenings);
        })
    }, []);

    useEffect(() => {
        const screeningsFromScreeningDate = screenings.filter((screening) => {
            const date = getLocaleDateString(screening.dateAndTime, { day: `numeric`, month: `numeric` });
            if (date === screeningDate) { return true; }
            return false;
        });
        setFilteredScreenings(screeningsFromScreeningDate);
    }, [screenings, screeningDate])

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

    /* const handleSetScreeningDate = (e) => {
        setScreeningDate(e.target.value);
    } */

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
                    <ListGroup.Item key={id} className="rounded-bottom-0" variant="primary" active={getLocaleDateString(dateAndTime, { day: `numeric`, month: `numeric` }) === screeningDate} action onClick={() => {
                        if (getLocaleDateString(dateAndTime, { day: `numeric`, month: `numeric` }) !== screeningDate) {
                            setSelectedScreening('');
                            setScreeningDate(getLocaleDateString(dateAndTime, { day: `numeric`, month: `numeric` }));
                        }
                    }}>
                        {`${capitalize(getLocaleDateString(dateAndTime, { weekday: `short` }))}, ${getLocaleDateString(dateAndTime, { day: `numeric` })} ${getLocaleDateString(dateAndTime, { month: `short` })}`}
                    </ListGroup.Item>
                )}
            </>
        );

        /* const ScreeningDateItems = () => {
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
                <Col className="d-flex justify-content-center">
                    <ListGroup className="w-100 border-bottom-0" horizontal>
                        <ScreeningDateItems />
                    </ListGroup>
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