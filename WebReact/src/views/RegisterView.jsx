import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { isPasswordValid } from "../utilsAndHooks/PasswordValidate";
import { post } from "../utilsAndHooks/rest";

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
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // kollar och validerar lösenordet refferar till paswsworValidate.js
    const validatePassword = () => {
        const isValid = isPasswordValid(formData.password);
        setPasswordValid(isValid);
        setPasswordTouched(true);
    };
    // till post senare
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Email format validation
        if (!isValidEmail(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        // Check if email is unique (this assumes you have a get method in rest.js)
        try {
            const emailAvailable = await get(`api/User/CheckEmail?email=${formData.email}`);
            if (!emailAvailable) {
                alert("Email is already taken. Please use a different email address.");
                return;
            }
        } catch (error) {
            alert('Failed to check email availability: ' + error);
            return;
        }
    
        // Continue with registration as before
        var NewUserData = formData;
        try {
            var result = await post('api/User', NewUserData);
            if (result && result.error) {
                alert('Registration failed: ' + result.error);
            } else {
                alert('Registration successful!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });
            }
        } catch (error) {
            alert('An unexpected error occurred: ' + error);
        }
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