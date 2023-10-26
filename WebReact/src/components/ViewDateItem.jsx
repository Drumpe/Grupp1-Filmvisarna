import React from "react";
import { get } from '../utilsAndHooks/rest';
import { getLocaleDateString } from '../utilsAndHooks/formatter';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';



export default function ViewDateItem() {

  const [{ movies }] = useOutletContext();
  const [screenings, setScreenings] = useState([]);
  const [FoundScreening, setFoundScreening] = useState([])
  const ref = useRef(null);
  const [screeningDatesScrollPosition, setScreeningDatesScrollPosition] = useState(0);
  const [showMore, setShowMore] = useState(5);


  useEffect(() => {
    fetchData();

  }, [])



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

  //Hämtar screenings
  const fetchData = async () => {
    var result = await get('Screenings/asc')
    setScreenings(result);
  }
  function getScreeningsByDate(screenings, givenDateAndTime) {
    const formattedDate = givenDateAndTime.slice(0, 10); // Extract yyyy-mm-dd from givenDateAndTime
    return screenings.filter(screening => {
      const screeningDate = screening.dateAndTime.slice(0, 10); // Extract yyyy-mm-dd from the screening dateAndTime
      return screeningDate === formattedDate;
    });
  }


  //sets single screening that is clicked
  const handleClick = (screening) => {
    const items = getScreeningsByDate(screenings, screening.dateAndTime)
    return setFoundScreening(items)
  }

  const displayFoundScreenings = () => {
    return (

      <ListGroup className="border-bottom-0" variant="flush">
        {FoundScreening.slice(0, showMore).map(fs => {
          const today = new Date();
          const selectedDay = new Date(fs.dateAndTime);
          const getHours = new Date(fs.dateAndTime).getHours();
          const getMinutes = new Date(fs.dateAndTime).getMinutes();
          const movieName = movies.find(m => m.id === fs.movieId)
          if (today > selectedDay) {
            return false;
          }
          return (
            <ListGroup.Item key={fs.id} variant="secondary" className="rounded-bottom-0  w-100" action href={`/MovieView/${fs.movieId}`}>
              {`${getHours}:${getMinutes} ${movieName.movie}`}
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    )
  }

  const showScreenings = () => {
    const uniqueDays = [];

    const filteredScreenings = screenings.filter((x) => {
      const today = new Date();
      const date = new Date(x.dateAndTime);
      const weekday = date.toLocaleDateString(date, { month: 'numeric', day: 'numeric' });

      if (!uniqueDays.includes(weekday) && date >= today) {
        uniqueDays.push(weekday);
        return true;
      }
      return false;
    });
    return (
      <>
        {filteredScreenings.map((s) => {
          return (
            <ListGroup.Item
              key={s.id}
              className="rounded-bottom-0  w-100 pb-3"
              variant="primary"
              action
              onClick={() => handleClick(s)}
            >
              {`${getLocaleDateString(s.dateAndTime, { month: 'numeric', day: 'numeric' })}
                - ${getLocaleDateString(s.dateAndTime, { weekday: 'long' })}`}
            </ListGroup.Item >
          )
        })}
      </>

    );
  }

  return <>
    <Row>
      <Col className="screening-dates d-flex justify-content-center">
        <div ref={ref} className="w-100 overflow-x-scroll scrollbar-hidden">
          {
            screeningDatesScrollPosition > 25 &&
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

          <ListGroup className="border-bottom-0" horizontal>
            {showScreenings()}
          </ListGroup>
        </div>
      </Col>
    </Row>
    <Row>

    </Row>
    <Col>
      <div>
        {displayFoundScreenings()}
      </div>
    </Col>
  </>

}
