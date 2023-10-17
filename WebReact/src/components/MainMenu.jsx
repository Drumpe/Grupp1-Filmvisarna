import React, { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {NavLink, useNavigate} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { del } from '../utilsAndHooks/rest';


export default function MainMenu({ user }) {
  let navigate = useNavigate();
  async function logout() {
    try {
      //var result = 
      await del('users/logout');
    } catch (error) {
      console.log("Error i logout: ", error);
    }
    navigate("/");
    //console.log("LOGOUT: ", result);
  }

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand} expand={expand}
          className="mb-3 navbar-dark"
        >

          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand to="/StartView">
              <div className="h6 text-secondary custom-text-logo text-center m-0">
                <img src="/img/logo/filmvisarna-logo-icon.png" className="d-block custom-logo-navbar mx-auto"></img>
                Filmvisarna
              </div>
            </Navbar.Brand>
            <div></div>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              className="bg-dark text-light"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 ">
                  {(user.userRole === "member") ?
                    <>
                      <NavLink to="/StartView/" className="nav-link" onClick={logout}>Logga ut</NavLink>
                      <NavLink to="/AccountView">Mitt konto</NavLink>
                    </>
                    :
                    <>
                      <NavLink to="/LoginView">Logga in</NavLink>
                      <NavLink to="/RegisterView">Bli medlem</NavLink>
                    </>
                  }

                  <NavLink to="/StartView">Visas nu</NavLink>
                  <NavLink to="/CancelView">Avboka</NavLink>
                  <NavLink to="/AboutView">Om</NavLink>
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar >
      ))
      }
    </>
  );
}
