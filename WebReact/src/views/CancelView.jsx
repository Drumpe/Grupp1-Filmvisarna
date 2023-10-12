import { useState } from 'react'
import { Container, Button, Modal } from 'react-bootstrap';
import { del } from '../utilsAndHooks/rest';

export default function CancelView() {
    const [show, setShow] = useState(false);
    const [send, setSend] = useState({
        bookingNumber: "",
        emailAdress: ""
    })

    async function SendDelete() {
        var body = {
            bookingnr: send.bookingNumber,
            email: send.emailAdress
        }
        await fetch(`http://localhost:5052/api/Bookings/RemoveBooking/${body.bookingnr}/${body.email}`, { method: 'DELETE', })
            .catch((e) => {
                console.log(e);
            });
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Container>
            <h1>Avbokning</h1>
            <p>{send.bookingNumber}</p>
            <p>{send.em}</p>
            <hr />
            <br />
            <form method="post" className='row g-3 '>
                <label>Bokningsnummer</label>
                <input type='text' placeholder='xxxxxx' onChange={x => {
                    setSend({
                        ...send,
                        bookingNumber: x.target.value
                    });
                }}
                    className='col-7  p-3' />
                <label>E-mail adress</label>
                <input type='text' placeholder='exempel@gmail.com' onChange={x => {
                    setSend({
                        ...send,
                        emailAdress: x.target.value
                    });
                }} className='col-7  p-3' />
                <Button variant="primary btn btn-primary col-6" onClick={handleShow}>
                    Avboka
                </Button>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Avbokning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Är du säker på att du vill avboka?
                        <hr />
                        Terminator 4, 18:00, 1 April 2024
                        <ul>
                            <li>1 vuxen biljett</li>
                            <li>1 pensionärs biljett</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Behåll bokning
                        </Button>
                        <Button variant="primary" onClick={SendDelete} >
                            Avboka bokning
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </Container>
    );
}