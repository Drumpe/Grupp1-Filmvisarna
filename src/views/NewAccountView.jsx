import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function MyComponent() {
  return (
    <div>
      <div className="d-flex justify-content-around">
        <Card style={{ width: '20rem' }} className="custom-card">
          <Card.Body>
            <Card.Title className="text-center title">Skapa användare</Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div className='my-3 mx-3'>
        <Form>
            <Form.Label>Förnamn</Form.Label>
              <Form.Control type="firstname" className='rounded-0'/>
              <Form.Label>Efternamn</Form.Label>
              <Form.Control type="lastname className='rounded-0'"/>
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" className='rounded-0'/>
              <Form.Label>Telefon nummer</Form.Label>
              <Form.Control type="phonenumber" className='rounded-0'/>
              <Form.Label>Lösenord</Form.Label>
            <Form.Control type="password" className='rounded-0'/>
        </Form>
      </div>
        <div className='d-flex justify-content-center my-5'>
            <div className="mb-2">
                <Button variant="secondary" size="lg">
                    Skapa
                </Button>{' '}
                <Button variant="secondary" size="lg">
                    Avbryt
                </Button>
            </div>
        </div>
    </div>
  );
}
