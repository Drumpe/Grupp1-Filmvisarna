import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default function MyComponent() {
  return (
    <div>
      <div className="d-flex justify-content-around">
        <h1 className='text-center'>Logga in</h1>
      </div>
      <div>
        <div className="my-3 mx-3">
          <Form>
            <Form.Label>Användarnamn</Form.Label>
            <Form.Control type="Username" className='rounded-0'/>
            <Form.Label>Lösenord</Form.Label>
            <Form.Control type="Password" className='rounded-0'/>
          </Form>
        </div>
      </div>
      <p className='Custom-text-center'>Inte medlem ännu? <a href= "./NewAccountView">Bli medlem</a></p>
        <div className='d-flex justify-content-center my-5 mb-2'>
                <Button variant="secondary" size="lg">
                    Logga in
                </Button>
        </div>
    </div>
  );
}
