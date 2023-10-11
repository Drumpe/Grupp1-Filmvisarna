import React, { useState} from "react"
import { Row, Col, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';

export default function ShowSeats({seats, theater, seatClicked}) {
    const [result, setResult] = useState();
  
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
                    <ButtonToolbar className="mb-2" aria-label="Toolbar with Button groups">
                        <ButtonGroup className="me-2" aria-label="First group">
                            {rows[rowNumber].map((seatElement) => (
                                <Button onClick={() => seatClicked(seatElement.seatId)}
                                    variant={(seatElement.booked ? "danger" : seatElement.wanted ? "primary" : "secondary") + " me-2"} //Färgerna är test
                                    key={seatElement.seatId}
                                    disabled={(seatElement.booked)} >
                                    {seatElement.seat}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
            </Row >
        ));
    }

    return <>
        <div>
            <h3 className ="text-center">{theater.name}</h3>
            <br />
            {rowElements()}
        </div>
    </>;
}