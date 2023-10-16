import React from "react"
import { Row, Col, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

export default function ShowSeats({ seats, theater, seatClicked }) {

    const rowElements = () => {
        // Organisera seats by rows
        const rows = {};
        seats.forEach((element) => {
            if (!rows[element.row]) {
                rows[element.row] = [];
            }
            rows[element.row].push(element);
        });
        return Object.keys(rows).map((rowNumber) => (
            <Row key={rowNumber}>
                {/*<Col className="col-2">Rad {rowNumber}</Col>*/}
                <Col className="d-flex justify-content-center">

                    {rows[rowNumber].reverse().map((seatElement) => (

                        <img
                            onClick={() => seatClicked(seatElement.seatId)}
                            src={(seatElement.booked ? "/img/ui/seat-red.svg" : seatElement.wanted ? "/img/ui/seat-blue.svg" : "/img/ui/seat-green.svg")} //Första försöket färg
                            key={seatElement.seatId}
                            disabled={(seatElement.booked)}
                            width="75" 
                            />
                    ))}

                </Col>
            </Row >
        ));
    }

    return <>
        <div>
            <h3 className="text-center">{theater.name}</h3>
            <br />
            {rowElements()}
        </div>
    </>;
}