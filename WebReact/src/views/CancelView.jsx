import { useState } from 'react'
import { Container, Button, Modal } from 'react-bootstrap';

export default function CancelView() {
    return (
        <Container>
            <h1>Avbokning</h1>
            <hr />
            <br />
            <form method="post" className='row g-3 '>
                <label htmlFor="inputBookingNumber">Bokningsnummer</label>
                <input type="text" placeholder='XXX-XXX' className='col-7  p-3' />
                {ConfirmationButton()}
            </form>
        </Container>
    );
}
function ConfirmationButton() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
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
                    <Button variant="primary" onClick={handleClose} href='/StartView'> {/* TODO: Skicka info till api och gå sedan till startview */}
                        Avboka bokning
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}