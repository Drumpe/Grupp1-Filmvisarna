import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { isPasswordValid } from "../utilsAndHooks/Validate";
import { isValidEmail } from "../utilsAndHooks/Validate";
import { isNameValid } from "../utilsAndHooks/Validate";
import { post } from "../utilsAndHooks/rest";
//import '../sass/RegisterViewStyling.scss';


export default function RegisterView() {
    const [emailValid, setEmailValid] = useState(true);

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');


    const [firstNameValid, setFirstNameValid] = useState(true);

    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');

    const [lastNameValid, setLastNameValid] = useState(true);

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

        if (name === "email") {

            setEmailValid(isValidEmail(value));
            if (!isValidEmail(value)) {
                setEmailErrorMsg("Vänligen ange en giltig e-postadress.");
            } else {
                setEmailErrorMsg("");
            }

            setFormData({ ...formData, [name]: value });  // Update the formData for email regardless of validation status
        } else if (name === "firstName") {

            setFirstNameValid(isNameValid(value));
            if (!isNameValid(value)) {
                setFirstNameErrorMsg("Vänligen använd endast bokstäver i Förnamn.");
            } else {
                setFirstNameErrorMsg("");
            }

            if (isNameValid(value)) {  // Only update formData if name is valid
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "lastName") {

            setLastNameValid(isNameValid(value));
            if (!isNameValid(value)) {
                setLastNameErrorMsg("Vänligen använd endast bokstäver i Efternamn.");
            } else {
                setLastNameErrorMsg("");
            }

            if (isNameValid(value)) {  // Only update formData if name is valid
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "password") {
            validatePassword();

            setPasswordTouched(true);
            if (!isPasswordValid(value)) {
                setPasswordErrorMsg("Lösenordet måste innehålla minst 8 tecken, en stor bokstav, en liten bokstav, ett nummer och ett specialtecken.");
            } else {
                setPasswordErrorMsg("");
            }

            setFormData({ ...formData, [name]: value });  // Update the formData for password regardless of validation status
        }
    };



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
            alert("Vänligen ange en giltig e-postadress.");
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
                alert('Registreringen misslyckades: ' + result.error);
            } else {
                // Handle successful registration
                alert('Registrering lyckad!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });

            }
        } catch (error) {
            // Handle unexpected errors from API call)
            alert('Ett oväntat fel uppstod: ' + error);
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
            <p className="text-center">Fyll i alla uppgifter nedan för att bli medlem.</p>
            <Form className="mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupFirstName">
                    <Form.Label>Förnamn</Form.Label>
                    <Form.Control type="text" name="firstName" required={true} style={{ display: 'block' }} placeholder="Förnamn" onChange={handleInputChange} />
                    {firstNameErrorMsg && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{firstNameErrorMsg}</div>}

                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                    <Form.Label>Efternamn</Form.Label>
                    <Form.Control type="text" name="lastName" required={true} placeholder="Efternamn" onChange={handleInputChange} />
                    {lastNameErrorMsg && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{lastNameErrorMsg}</div>}

                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>E-postadress</Form.Label>
                    <Form.Control type="email" name="email" placeholder="namn@epost.se" onChange={handleInputChange} />
                    {emailErrorMsg && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{emailErrorMsg}</div>}

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
                    {passwordErrorMsg && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{passwordErrorMsg}</div>}
                </Form.Group>
                <Row className="justify-content-between">
                    <Col className="mx-auto text-center d-grid">
                        <Button type="submit" variant="primary" size="lg" disabled={!emailValid || !passwordValid || !formData.firstName.trim() || !formData.lastName.trim()} onClick={handleSubmit}>
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