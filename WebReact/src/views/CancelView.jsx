import { useEffect, useState } from 'react'
import { Container, Button, Modal, Form, FormGroup } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';
import { getLocaleDateString } from '../utilsAndHooks/formatter';

export default function CancelView() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const [message, setMessage] = useState("");
    const [formatedDate, setFormatedDate] = useState('');
    const [send, setSend] = useState({
        bookingNumber: "",
        emailAdress: ""
    })

    //DeleteFetch
    async function SendDelete() {
        await fetch(`http://localhost:5052/api/Bookings/RemoveBooking/${send.bookingNumber}/${send.emailAdress}`, { method: 'DELETE', })
            .then((res) => {
                switch (res.status) {
                    case !200:
                        setMessage("Ops! Ett fel har uppstått. Försök senare eller kontakta oss via kundtjänst");
                        break;
                    default:
                }
            }).catch(e => console.log(e))
    };
    //FindData 
    async function fetchData() {
        var result = await get(`/Bookings/confirm/${send.bookingNumber}/${send.emailAdress}`)
        setData(result)
        return result;
    }

    useEffect(() => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        setFormatedDate(getLocaleDateString(data.screeningTime, options));
    }, [data.screeningTime])

    //Form for filling booking.nr and email
    function form() {
        return <>
            <div className="mx-auto">
                <FormGroup className="form-floating mb-3">
                    <Form.Control type='text' className='rounded-3' placeholder='Bokningsnummer' onChange={
                        (x) =>
                            setSend({
                                ...send,
                                bookingNumber: x.target.value
                            })}>
                    </Form.Control>
                    <Form.Label>Bokningsnummer</Form.Label>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                    <Form.Control type='text' placeholder='E-postadress' onChange={
                        (x) => setSend({
                            ...send,
                            emailAdress: x.target.value
                        })}></Form.Control>
                    <Form.Label>E-postadress</Form.Label>
                </FormGroup>
                <p id="message">{message}</p>
                <Button variant="primary" size="lg"
                    onClick={verifyData}
                    disabled={!(send.bookingNumber && send.emailAdress)}>
                    Avboka
                </Button >
            </div>
        </>
    }




    //Show and hide pop up handler
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const verifyData = async () => {
        let data = await fetchData();

        if (data.bookingId == null) {
            setMessage("Det angivna bokningsnumret eller e-postadressen är felaktig");
        } else {
            handleShow();
            setMessage("");
        }
    }

    const confirmDelete = async () => {
        await SendDelete();
        handleClose();
        setSend({
            bookingNumber: "",
            emailAdress: ""
        })
        setMessage("Avbokning har genomförts. Välkommen åter!")
    }

    return (
        <Container className="mx-auto text-center">
            <h1 className="mb-4">Avboka</h1>


            <form className='row g-3 '>
                {form()}
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Avbokning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Är du säker på att du vill avboka?
                        <hr />
                        {data.theater}, {formatedDate}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Behåll bokning
                        </Button>
                        <Button variant="primary" onClick={confirmDelete}>
                            Avboka bokning
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </Container>
    );
}
