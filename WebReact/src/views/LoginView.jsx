import React, { useState } from 'react';
import { Button, Form, Col, Image} from 'react-bootstrap';
import { post } from '../utilsAndHooks/rest';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';


export default function LoginView() {
  let navigate = useNavigate();
  const [{ }, setUser] = useOutletContext();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const sendLoginRequest = async () => {
    var login = {
      emailAdress: formData.email,
      password: formData.password
    }
    let result = await post('users/login', login);
    if (result.error) {
      alert("Felaktig e-postadress eller passord.");
      return;
    }
    setUser();
    navigate("/");
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
      <Col className="mx-auto text-center">
        <Image src="/img/logo/filmvisarna-logo-icon.png" roundedCircle style={{ width: '100px', height: '100px' }} />
      </Col>
      <div className="d-flex justify-content-around">
        <h1 className='text-center'>Logga in</h1>
      </div>
      <div className="my-3 mx-3">
        <Form>
          <Form.Label>E-postadress</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} className='rounded-0' onChange={handleInputChange} />
          <Form.Label>Lösenord</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} className='rounded-0' onChange={handleInputChange} />
        </Form>
      </div>
      <p className='text-center'>Inte medlem ännu? <NavLink to="/RegisterView">Bli medlem</NavLink></p>
      <div className='d-flex justify-content-center my-5 mb-2'>
        <Button variant="secondary" size="lg" onClick={sendLoginRequest}>
          Logga in
        </Button>
      </div>
    </>
  );
}
