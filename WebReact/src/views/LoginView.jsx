import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { post } from '../utilsAndHooks/rest';


export default function LoginView() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const sendRequest = async () => {
    /** Här borde göras kontroller innan vi skickar iväg och kolla att resultatet är ok */
    var login = {
      emailAdress: formData.email,
      password: formData.password
    }
    var result = await post('users/login', login);

    window.location.href = '/StartView/';
  };
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <div>
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
      <p className='text-center'>Inte medlem ännu? <Link to="/RegisterView">Bli medlem</Link></p>
      <div className='d-flex justify-content-center my-5 mb-2'>
        <Button variant="secondary" size="lg" onClick={sendRequest}>
          Logga in
        </Button>
      </div>
    </div>
  );
}
