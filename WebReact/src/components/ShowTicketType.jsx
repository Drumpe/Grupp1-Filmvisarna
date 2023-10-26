import React from "react";
import { Button } from 'react-bootstrap';

export default function ShowTicketType({ tickets, buttonsDisabled, setTickets }) {
  const increaseTicketCount = (category) => {
    setTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };
      switch (category) {
        case 'barn':
          if (updatedTickets.ordinary > 0) {
            updatedTickets.ordinary -= 1;
            updatedTickets.child += 1;
          }
          break;
        case 'pensionar':
          if (updatedTickets.ordinary > 0) {
            updatedTickets.ordinary -= 1;
            updatedTickets.pensioner += 1;
          }
          break;
        default:
          break;
      }
      return updatedTickets;
    });
  };

  const decreaseTicketCount = (category) => {
    setTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };
      switch (category) {
        case 'barn':
          if (updatedTickets.child > 0) {
            updatedTickets.ordinary += 1;
            updatedTickets.child -= 1;
          }
          break;
        case 'pensionar':
          if (updatedTickets.pensioner > 0) {
            updatedTickets.ordinary += 1;
            updatedTickets.pensioner -= 1;
          }
          break;
        default:
          break;
      }
      return updatedTickets;
    });
  };
  return <>
  <div className="d-flex justify-content-center">
    <table>
      <colgroup>
        <col style={{ width: '120px' }} />
        <col style={{ width: '40px' }} />
        <col style={{ width: '30px' }} />
        <col style={{ width: '40px' }} />
      </colgroup>
      <tbody>
        <tr>
          <td style={{ height: '39.6px' }}>Vuxen</td>
          <td></td>
          <td className="text-center">{tickets.ordinary}</td>
          <td></td>
        </tr>
        <tr>
          <td>Barn</td>
          <td className="d-flex justify-content-center"><Button onClick={() => decreaseTicketCount('barn')} variant="secondary" disabled={buttonsDisabled}>–</Button></td>
          <td className="text-center">{tickets.child}</td>
          <td className="d-flex justify-content-center"><Button onClick={() => increaseTicketCount('barn')} variant="primary" disabled={buttonsDisabled}>+</Button></td>
        </tr>
        <tr>
          <td>Pensionär</td>
          <td className="d-flex justify-content-center"><Button onClick={() => decreaseTicketCount('pensionar')} variant="secondary" disabled={buttonsDisabled}>–</Button></td>
          <td className="text-center">{tickets.pensioner}</td>
          <td className="d-flex justify-content-center"><Button onClick={() => increaseTicketCount('pensionar')} variant="primary" disabled={buttonsDisabled}>+</Button></td>
        </tr>
      </tbody>
    </table>
  </div>
  </>
}
