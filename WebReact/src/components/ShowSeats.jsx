import React from "react"
import { Row, Col, Image } from 'react-bootstrap';

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
                <Col className="d-flex justify-content-center">
                    {rows[rowNumber].reverse().map((seatElement) => (
                        <Image className="chairImage"
                            onClick={seatElement.booked ? null : () => seatClicked(seatElement.seatId)}
                            src={(seatElement.booked ? "/img/ui/chair-red.svg" : seatElement.wanted ? "/img/ui/chair-blue.svg" : "/img/ui/chair-green.svg")}
                            key={seatElement.seatId}
                        />
                    ))}
                </Col>
            </Row >
        ));
    }

    return <>
        <div>
            <h3 className="text-center">{theater.name}</h3>
            <hr />
            {rowElements()}
        </div>
    </>;
}