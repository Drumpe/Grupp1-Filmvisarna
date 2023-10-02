import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';




export default function LoginView() {
  return (
    <div>
      <div className="d-flex justify-content-around">
        <h1 className='text-center'>Logga in</h1>
      </div>
        <div className="my-3 mx-3">
          <Form>
            <Form.Label>E-postadress</Form.Label>
            <Form.Control type="email" className='rounded-0'/>
            <Form.Label>Lösenord</Form.Label>
            <Form.Control type="Password" className='rounded-0'/>
          </Form>
        </div>
      <p className='text-center'>Inte medlem ännu? <Link to="/RegisterView">Bli medlem</Link></p>
        <div className='d-flex justify-content-center my-5 mb-2'>
                <Button variant="secondary" size="lg">
                    Logga in
                </Button>
        </div>
    </div>
  );
}
