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
            setPasswordTouched(true);
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

    };
    // till post senare
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email format validation
        if (!isValidEmail(formData.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Continue with registration
        var NewUserData = {
            ...formData,
            EmailAdress: formData.email  // Use the property name "EmailAdress" to match the backend model
        };

        try {
            var result = await post('users/register/', NewUserData);

            if (result && result.error) {
                // Handle specific error response from API
                alert('Registration failed: ' + result.error);
            } else {
                // Handle successful registration
                alert('Registration successful!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });
            }
        } catch (error) {
            // Handle unexpected errors from API call)
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
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Lösenord</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Control
                            style={{ flex: '1' }}  // This will make the input take up all available space
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Lösenord"
                            onBlur={validatePassword}
                            isInvalid={!passwordValid && passwordTouched}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={toggleShowPassword}
                            style={{ marginLeft: '10px' }}  // Add a little spacing between input and button
                        >
                            {showPassword ? 'Göm' : 'Visa'}
                        </Button>
                    </div>
                    {!passwordValid && passwordTouched && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                            Lösenordet måste vara 8 tecken långt, innehålla minst ett specialtecken och minst ett nummer.
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Row className="justify-content-between">
                <Col className="mx-auto text-center d-grid">
                <Button type="submit" variant="primary" size="lg" disabled={!passwordValid} onClick={handleSubmit}>
                Bli medlem
                </Button>
                </Col>
                <Col className="mx-auto text-center d-grid">
                    <Button variant="secondary link" href="/StartView" size="lg">
                        Avbryt
                    </Button>
                </Col>
                </Row>
            </Form>
        </Container>
    );
}

