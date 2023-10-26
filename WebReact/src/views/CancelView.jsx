import { useEffect, useState } from 'react'
import { Container, Button, Col, Form, Image, Modal, Alert } from 'react-bootstrap';
import { get } from '../utilsAndHooks/rest';
import { getLocaleDateString } from '../utilsAndHooks/formatter';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';


export default function CancelView() {
  const [globals, { }] = useOutletContext();
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
    return (
      <Container>
        <Col className="mx-auto text-center d-none d-lg-block">
          <Image
            src="/img/logo/filmvisarna-logo-icon.png"
            roundedCircle
            style={{ width: '100px', height: '100px' }}
          />
        </Col>
        <div className="d-flex justify-content-around">
          <h1 className="text-center">Avbokning</h1>
        </div>
        <div className="my-3 mx-3">
          <Form.Group className="form-floating">
            <Form.Control
              type="text"
              name="bookingNumber"
              value={send.bookingNumber}
              className="rounded-3"
              placeholder="Bokningsnummer"
              onChange={(x) =>
                setSend({
                  ...send,
                  bookingNumber: x.target.value
                })}
            />
            <Form.Label>Bokningsnummer</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating my-4 ">
            <Form.Control
              type="email"
              name="emailAdress"
              value={globals.user.userRole === 'guest' ? send.emailAdress : globals.user.email}
              className="rounded-3"
              placeholder="E-postadress"
              onChange={(x) => setSend({
                ...send,
                emailAdress: x.target.value
              })}
            />
            <Form.Label>E-postadress</Form.Label>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center my-3 mb-2">
          <Button
            variant="primary"
            size="lg"
            onClick={verifyData}
            disabled={!(send.bookingNumber && (send.emailAdress || globals.user.userRole === "member"))}
          >
            Avboka
          </Button>
        </div>
        <p id="message">{message}</p>
      </Container>
    );

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
    <Container className='py-3 rounded-3 bg-info col-lg-8 bg-opacity-75 mt-5'>
      <form className='row g-3 my-3 mx-3 '>
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
            <Button variant="primary" onClick={handleClose}>
              Behåll bokning
            </Button>
            <Button variant="secondary" onClick={confirmDelete}>
              Avboka bokning
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </Container>
  );
}
