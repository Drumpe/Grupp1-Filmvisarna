import React from "react";
import { get } from '../utilsAndHooks/rest';
import { getLocaleDateString, getLocaleTimeString, displayScreeningDate } from '../utilsAndHooks/formatter';
import { useOutletContext, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';



export default function ViewDateItem() {

  const [{ movies }] = useOutletContext();
  const [screenings, setScreenings] = useState([]);
  const [FoundScreening, setFoundScreening] = useState([])
  const ref = useRef(null);
  const [screeningDatesScrollPosition, setScreeningDatesScrollPosition] = useState(0);

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

      <ListGroup className="border-bottom-0" variant="flush" >
        {FoundScreening.map(fs => {
          const movieName = movies.find(m => m.id === fs.movieId)
          if (!FoundScreening.includes(fs.dateAndTime)) {
            return (
              <NavLink style={{ textDecoration: 'none' }} to={`/TheaterView/${fs.id}`}>
                <ListGroup.Item key={fs.id} variant="secondary" className="rounded-bottom-0  w-100">
                  {`${getLocaleTimeString(fs.dateAndTime, { hour: '2-digit', minute: '2-digit' })} ${movieName.movie}`}
                </ListGroup.Item>
              </NavLink>
            )
          }
          return false;

        })
        }
      </ListGroup >
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
        {filteredScreenings.map((s, i) => {
          return (
            <ListGroup.Item
              key={i}
              className="rounded-bottom-0  w-100 pb-3"
              variant="primary"
              action
              onClick={() => handleClick(s)}
            >
              {`${displayScreeningDate(s.dateAndTime)}`}
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
