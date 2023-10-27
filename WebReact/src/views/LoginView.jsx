import React, { useState } from 'react';
import { Button, Form, Col, Image, Container } from 'react-bootstrap';
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
    <Container className='row mx-auto d-flex justify-content-center '>
      <div className=' py-3 rounded-3 bg-info col-lg-8 mt-5 bg-opacity-75'>
        <Col className="mx-auto text-center d-none d-lg-block">
          <Image src="/img/logo/filmvisarna-logo-icon.png" roundedCircle style={{ width: '100px', height: '100px' }} />
        </Col>
        <div className="d-flex justify-content-around">
          <h1 className="text-center mt-1 mb-4">Logga in</h1>
        </div>
        <div className=" my-3 mx-3">
          <Form>
            <div className="form-floating mx-4 ">
              <Form.Control type="email" name="email" value={formData.email} className='rounded-3' placeholder="Email" onChange={handleInputChange} />
              <Form.Label>E-postadress</Form.Label>
            </div>
            <div className="form-floating my-4 mx-4">
              <Form.Control type="password" name="password" value={formData.password} className='rounded-3' placeholder="Lösenord" onChange={handleInputChange} />
              <Form.Label>Lösenord</Form.Label>
            </div>
          </Form>
        </div>
        <p className='text-center'>Inte medlem ännu? <NavLink to="/RegisterView">Bli medlem</NavLink></p>
        <div className='d-flex justify-content-center my-4 mb-2'>
          <Button variant="primary" size="lg" onClick={sendLoginRequest}>
            Logga in
          </Button>
        </div>
      </div>
    </Container>
  );
}
