import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { isPasswordValid } from "../utilsAndHooks/PasswordValidate";

export default function RegisterView() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    // kollar om lösenordet är valid samt om pasword är rört.
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    
    // kollar om lösenordet är valid samt om pasword är rört i real tid.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "password") {
            validatePassword();
        }
    };
    // kollar och validerar lösenordet refferar till paswsworValidate.js
    const validatePassword = () => {
        const isValid = isPasswordValid(formData.password);
        setPasswordValid(isValid);
        setPasswordTouched(true);
    };
    // till post senare
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
        console.log(formData);
    };
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <Container>
            <Col className="mx-auto text-center">
                <Image src="/img/logo/filmvisarna-logo-icon.png" roundedCircle style={{ width: '100px', height: '100px' }} />
            </Col>
            <h1 className="text-center">Bli Medlem</h1>
            <Form className="mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupFirstName">
                    <Form.Label>Förnamn</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Förnamn" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                    <Form.Label>Efternamn</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Efternamn" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>E-Post addres</Form.Label>
                    <Form.Control type="email" name="email" placeholder="JoeDoe@email.se" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Lösenord"
                        onBlur={validatePassword}
                        isInvalid={!passwordValid}
                        onChange={handleInputChange}
                    />
                    <Button variant="outline-secondary" onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : 'Show'}
                    </Button>
                    {!passwordValid && passwordTouched && (
                        <Form.Control.Feedback type="invalid">
                            Lösenordet måste vara 8 tecken långt, innehålla minst ett specialtecken och minst ett nummer.
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Button type="submit" variant="primary" size="lg" disabled={!passwordValid}> 
                    Registera
                </Button>
                <Button variant="secondary link" href="/StartView" size="lg">
                    Avbryt
                </Button>
            </Form>
        </Container>
    );
}