import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { post, get } from '../utilsAndHooks/rest';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';


export default function LoginView() {
  let navigate = useNavigate();
  const [{},setUser] = useOutletContext();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const sendRequest = async () => {
    /** Här borde göras kontroller innan vi skickar iväg och kolla att resultatet är ok */
    var login = {
      emailAdress: formData.email,
      password: formData.password
    }
    await post('users/login', login);
    setUser();
    navigate("/");
    //window.location.href = '/StartView/';
  };
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <div className="container">
    <div className="border rounded bg-info">
      <div className="d-flex justify-content-around mt-4 ">
        <h1 className='text-center'>Logga in</h1>
      </div>
      <div className=" my-3 mx-3">
        <Form>
          <div className="form-floating mx-4">
          <Form.Control type="email" name="email" value={formData.email} className='rounded-0' placeholder="Email" onChange={handleInputChange} />
          <Form.Label>E-postadress</Form.Label>
          </div>
          <div className="form-floating my-4 mx-4">
          <Form.Control type="password" name="password" value={formData.password} className='rounded-0' placeholder="Lösenord" onChange={handleInputChange} />
          <Form.Label>Lösenord</Form.Label>
          </div>
        </Form>
      </div>
      <p className='text-center'>Inte medlem ännu? <NavLink to="/RegisterView">Bli medlem</NavLink></p>
      <div className='d-flex justify-content-center my-5 mb-2'>
        <Button variant="secondary" size="lg" onClick={sendRequest}>
          Logga in
        </Button>
      </div>
    </div>
  </div>
  );
}
