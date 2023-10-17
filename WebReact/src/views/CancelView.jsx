import { useEffect, useState } from 'react'
import { Container, Button, Modal, Alert } from 'react-bootstrap';
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
                    case 200:
                        setShow(false)
                        setMessage(`Din avbokning med Bookningsnummer ${send.bookingNumber} är nu genomförd`);
                        break;
                    default:
                        setShow(false)
                        setMessage("Oj! ett fel har inträffat. Vänligen försök igen eller försöksenare");
                }
            }).catch(e => console.log(e))
    };
    //FindData 
    async function fetchData() {
        var result = await get(`/Bookings/confirm/${send.bookingNumber}/${send.emailAdress}`)
        setData(result)
    }

    useEffect(() => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        setFormatedDate(getLocaleDateString(data.screeningTime, options));
    }, [data.screeningTime])

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
            <p id="message">{message}</p>
            <Button variant="primary btn btn-primary col-6"
                onClick={verifyData}
                disabled={!(send.bookingNumber && send.emailAdress)}>
                Avboka
            </Button >
        </>
    }




    //Show and hide pop up handler
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const verifyData = async () => {
        let data = await fetchData()
        if (!data.bookingId) {
            handleClose();
            setMessage("Det angivna bokningsnumret eller e-posten är fel!");
        }
        else if (data.bookingId) {
            handleShow()
        }
    }
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
                        {data.theater}, {formatedDate}
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
