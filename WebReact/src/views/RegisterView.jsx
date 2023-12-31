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
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';

//import '../sass/RegisterViewStyling.scss';


export default function RegisterView() {
    const [{ }, setUser] = useOutletContext();
    const navigate = useNavigate();
    const [emailValid, setEmailValid] = useState(true);

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');

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


            if (!isNameValid(value)) {
                setFirstNameErrorMsg("Vänligen använd endast bokstäver i Förnamn.");
            } else {
                setFirstNameErrorMsg("");
            }

            if (isNameValid(value)) {  // Only update formData if name is valid
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "lastName") {


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
                return;
            } else {
                // Handle successful registration
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });
                sendLoginRequest();

            }
        } catch (error) {
            // Handle unexpected errors from API call)
            alert('Ett oväntat fel uppstod: ' + error);
        }

    };

    const sendLoginRequest = async () => {
        var login = {
            emailAdress: formData.email,
            password: formData.password
        }
        let result = await post('users/login', login);
        if (result.error) {
            alert("Felaktig e-postadress eller passord.");
            return;
        }
        setUser();
        navigate("/");
    };

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <Container className="py-3 rounded-3 bg-info p-5 col-lg-8 bg-opacity-75 mt-5">
            <Col className="mx-auto text-center d-none d-lg-block">
                <Image src="/img/logo/filmvisarna-logo-icon.png" roundedCircle style={{ width: '100px', height: '100px' }} />
            </Col>
            <h1 className="text-center mt-1 mb-2">Bli medlem</h1>
            <p className="text-center mb-4">Fyll i alla uppgifter nedan för att bli medlem.</p>
            <Form className="mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="form-floating mb-3" controlId="formGroupFirstName">
                    <Form.Control type="text" name="firstName" required={true} style={{ display: 'block' }} placeholder="Förnamn" onChange={handleInputChange} />
                    <Form.Label>Förnamn</Form.Label>
                    {firstNameErrorMsg && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{firstNameErrorMsg}</div>}
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="formGroupLastName">
                    <Form.Control type="text" name="lastName" required={true} placeholder="Efternamn" onChange={handleInputChange} />
                    <Form.Label>Efternamn</Form.Label>
                    {lastNameErrorMsg && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{lastNameErrorMsg}</div>}

                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" name="email" placeholder="namn@epost.se" onChange={handleInputChange} />
                    <Form.Label>E-postadress</Form.Label>
                    {emailErrorMsg && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{emailErrorMsg}</div>}

                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <div className="d-flex align-items-center form-floating">
                        <Form.Control
                            style={{ flex: '1' }}  // This will make the input take up all available space
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Lösenord"
                            onBlur={validatePassword}
                            isInvalid={!passwordValid && passwordTouched}
                            onChange={handleInputChange}
                        />
                        <Form.Label>Lösenord</Form.Label>
                        <Button
                            variant="outline-secondary"
                            onClick={toggleShowPassword}
                            size="lg"
                            className="ms-3"
                        >
                            {showPassword ? 'Göm' : 'Visa'}
                        </Button>
                    </div>
                    {passwordErrorMsg && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{passwordErrorMsg}</div>}
                </Form.Group>
                <Row className=" justify-content-between">
                    <div className="d-flex mx-auto text-center">
                        <Col>
                            <Button type="submit" variant="primary" size="lg" disabled={!emailValid || !passwordValid || !formData.firstName.trim() || !formData.lastName.trim()} onClick={handleSubmit} >
                                Registrera
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="secondary link" href="/StartView" size="lg">
                                Avbryt
                            </Button>
                        </Col>
                    </div>
                </Row>
            </Form>
        </Container>
    );
}