import { useEffect, useState } from 'react'
import { Container, Button, Modal } from 'react-bootstrap';
import { del } from '../utilsAndHooks/rest';
import { redirect } from 'react-router-dom';

export default function CancelView() {
    const [show, setShow] = useState(false);
    const [send, setSend] = useState({
        bookingNumber: "",
        emailAdress: ""
    })



    //DeleteFetch
    async function SendDelete() {
        var body = {
            bookingnr: send.bookingNumber,
            email: send.emailAdress
        }
        await fetch(`http://localhost:5052/api/Bookings/RemoveBooking/${body.bookingnr}/${body.email}`, { method: 'DELETE', })
            .then((res) => {
                if (res.status === 400) {
                    setShow(false)
                    return alert("Den angivna boknings nummer eller e-post adress är felaktig")
                }
                else if (res.status != 200) {
                    setShow(false)
                    return alert("Ops avbokning gick inte igenom!")
                }
            }).catch(e => console.log(e))
    };

    //Form for filling booking.nr and email
    function form() {
        const handleBooking = (x) => {
            setSend({
                ...send,
                bookingNumber: x.target.value
            });
        };
        const handleEmail = (x) => {
            setSend({
                ...send,
                emailAdress: x.target.value
            });
        };

        return <>
            <label>Bokningsnummer</label>
            <input type='text' placeholder='xxxxxx' onChange={handleBooking}
                className='col-7  p-3' />
            <label>E-post adress</label>
            <input type='text' placeholder='exempel@gmail.com' onChange={handleEmail} className='col-7  p-3' />
            <Button variant="primary btn btn-primary col-6" onClick={handleShow} disabled={!(send.bookingNumber && send.emailAdress)}>
                Avboka
            </Button>
        </>
    }

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
                        <Button variant="primary" onClick={SendDelete} href='/StartView'>
                            Avboka bokning
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </Container>
    );
}