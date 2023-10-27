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
  <div className="d-flex justify-content-center mt-3">
    <table>
      <colgroup>
        <col style={{ width: '120px' }} />
        <col style={{ width: '40px' }} />
        <col style={{ width: '30px' }} />
        <col style={{ width: '40px' }} />
      </colgroup>
      <tbody>
        <tr>
          <td style={{ height: '39.6px' }}>Ordinarie</td>
          <td></td>
          <td className="text-center">{tickets.ordinary}</td>
          <td></td>
        </tr>
        <tr>
          <td>Barn</td>
            <td className="d-flex justify-content-center"><Button className="text-monospace bg-gray-light-transparent border-1 border-light-subtle" onClick={() => decreaseTicketCount('barn')} variant="dark" disabled={buttonsDisabled || tickets.child === 0}>–</Button></td>
          <td className="text-center">{tickets.child}</td>
            <td className="d-flex justify-content-center"><Button className="text-monospace bg-gray-light-transparent border-1 border-light-subtle" onClick={() => increaseTicketCount('barn')} variant="dark" disabled={buttonsDisabled || tickets.ordinary === 0}>+</Button></td>
        </tr>
        <tr>
          <td>Pensionär</td>
            <td className="d-flex justify-content-center"><Button className="text-monospace bg-gray-light-transparent border-1 border-light-subtle" onClick={() => decreaseTicketCount('pensionar')} variant="dark" disabled={buttonsDisabled || tickets.pensioner === 0}>–</Button></td>
          <td className="text-center">{tickets.pensioner}</td>
            <td className="d-flex justify-content-center"><Button className="text-monospace bg-gray-light-transparent border-1 border-light-subtle" onClick={() => increaseTicketCount('pensionar')} variant="dark" disabled={buttonsDisabled || tickets.ordinary === 0}>+</Button></td>
        </tr>
      </tbody>
    </table>
  </div>
  </>
}
