import { useState } from 'react'
import { Container, Button, Modal, Alert } from 'react-bootstrap';

export default function CancelView() {
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState("");
    const [send, setSend] = useState({
        bookingNumber: "",
        emailAdress: ""
    })
    //DeleteFetch
    async function SendDelete() {
        await fetch(`http://localhost:5052/api/Bookings/RemoveBooking/${send.bookingNumber}/${send.emailAdress}`, { method: 'DELETE', })
            .then((res) => {
                switch (res.status) {
                    case 400:
                        setShow(false)
                        alert("Den angivna Bookningsnummer eller e-post adress är fel");
                        break;
                    case !200:
                        setShow(false)
                        alert("Oj! ett fel har inträffat. Vänligen försök igen eller försöksenare");
                        break;
                    case 200:
                        setShow(false)
                        setShowError(true);
                }
            }).catch(e => console.log(e))
    };
    //Form for filling booking.nr and email
    function form() {
        return <>
            <label>Bokningsnummer</label>
            <input id='reset1' type='text' placeholder='xxxxxx' onChange={
                (x) =>
                    setSend({
                        ...send,
                        bookingNumber: x.target.value
                    })}
                className='col-7  p-3' />
            <label>E-post adress</label>
            <input id='reset2' type='text' placeholder='exempel@gmail.com' onChange={
                (x) => setSend({
                    ...send,
                    emailAdress: x.target.value
                })}
                className='col-7  p-3' />
            {showError ? <p className='green'>Din avbokning med Bookningsnummer {send.bookingNumber} är nu genomförd</p> : null}
            <Button variant="primary btn btn-primary col-6" onClick={handleShow} disabled={!(send.bookingNumber && send.emailAdress)}>
                Avboka
            </Button>
        </>
    }

    //Show and hide pop up handler
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        Är du säker på att du vill avboka?<hr />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Behåll bokning
                        </Button>
                        <Button variant="primary" onClick={SendDelete} href='/CancelView'>
                            Avboka bokning
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </Container>
    );
}