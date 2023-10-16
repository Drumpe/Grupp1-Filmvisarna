import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';




export default function LoginView() {
  return (
    <div className="login-container">
      <div className="d-flex justify-content-around">
        <h1 className='login-title'>Logga in</h1>
      </div>
      <div className="my-3 mx-3">
        <Form>
          <Form.Label className="form-label">E-postadress</Form.Label>
          <Form.Control type="email" className='form-control'/>
          <Form.Label className="form-label">Lösenord</Form.Label>
          <Form.Control type="Password" className='form-control'/>
        </Form>
      </div>
      <p className='register-link'>Inte medlem ännu? <Link to="/RegisterView">Bli medlem</Link></p>
      <div className='login-button d-flex justify-content-center my-5 mb-2'>
        <Button variant="secondary" size="lg">
          Logga in
        </Button>
      </div>
    </div>
  );
}
