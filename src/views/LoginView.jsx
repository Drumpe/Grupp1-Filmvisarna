import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function MyComponent() {
  return (
    <div>
      <div className="d-flex justify-content-around">
        <Card style={{ width: '20rem' }} className="custom-card">
          <Card.Body>
            <Card.Title className="text-center title">Login</Card.Title>
          </Card.Body>
        </Card>
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
        <div className='d-flex justify-content-center my-5'>
            <div className="mb-2">
                <Button variant="secondary" size="lg">
                    Logga in
                </Button>{' '}
                <Button variant="secondary" size="lg">
                    Skapa konto
                </Button>
            </div>
        </div>
    </div>
  );
}
