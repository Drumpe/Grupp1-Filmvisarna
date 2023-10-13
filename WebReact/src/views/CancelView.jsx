import { useEffect, useState } from 'react'
import { Container, Button, Modal, Alert } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';

export default function CancelView() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const [seatFinder, setSeatFinder] = useState([])
    const [send, setSend] = useState({
        bookingNumber: "",
        emailAdress: ""
    })

    //FindData 
    async function fetch() {
        var result = await get(`/Bookings/confirm/${send.bookingNumber}/${send.emailAdress}`)
        setData(result)
        setSeatFinder(result.tickets)
    }

    //DeleteFetch
    async function SendDelete() {
        await fetch(`http://localhost:5052/api/Bookings/RemoveBooking/${send.bookingNumber}/${send.emailAdress}`, { method: 'DELETE', })
            .then((res) => {
                switch (res.status) {
                    case 400:
                        setShow(false)
                        alert("Den angivna Bookningsnummer eller e-post adress är fel")
                        break;
                    case 200:
                        setShow(false)
                        alert(`Din avbokning med Bookningsnummer ${send.bookingNumber} är nu genomförd`)
                        break;
                    case 200:
                        break;
                    default:
                        setShow(false)
                        alert("Oj! ett fel har inträffat. Vänligen försök igen eller försöksenare")
                }
            }).catch(e => console.log(e))
    };

    useEffect(() => {

    }, [])


    //Form for filling booking.nr and email
    function form() {
        return <>
            <label>Bokningsnummer</label>
            <input type='text' placeholder='xxxxxx' onChange={
                (x) =>
                    setSend({
                        ...send,
                        bookingNumber: x.target.value
                    })}
                className='col-7  p-3' />
            <label>E-post adress</label>
            <input type='text' placeholder='exempel@gmail.com' onChange={
                (x) => setSend({
                    ...send,
                    emailAdress: x.target.value
                })}
                className='col-7  p-3' />
            <p id='message'></p>
            <Button variant="primary btn btn-primary col-6" onClick={function (event) { handleShow(); fetch(); }} disabled={!(send.bookingNumber && send.emailAdress)}>
                Avboka
            </Button >
        </>
    }

    //Show and hide pop up handler
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function countTicketTypes(tickets) {
        const counts = {};

        tickets.forEach(function (ticket) {
            const type = ticket.type;
            counts[type] = (counts[type] || 0) + 1;
        });

        return counts;
    }
    const ticketAmount = Object.entries(countTicketTypes(seatFinder)).map(([key, val]) => <li key={key}>{val} {key} biljett </li>)
    return (
        <Container>
            <h1>Avbokning</h1>
            <hr />
            <br />
            <form className='row g-3 '>
                {form()}
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Avbokning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Är du säker på att du vill avboka?
                        <hr />
                        {data.theater}, {data.screeningTime},
                        <ul>
                            {ticketAmount}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Behåll bokning
                        </Button>
                        <Button variant="primary" onClick={SendDelete}>
                            Avboka bokning
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </Container>
    );
}