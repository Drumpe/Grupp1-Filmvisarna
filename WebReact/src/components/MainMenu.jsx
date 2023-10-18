import React, { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { del } from '../utilsAndHooks/rest';


export default function MainMenu({ user }) {
  async function logout() {
    try {
      //var result = 
      await del('users/logout','');
    } catch (error) {
      console.log("Error i logout: ", error);
    }
    //console.log("LOGOUT: ", result);
  }

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand} expand={expand}
          className="mb-3 navbar-dark fixed-top bg-info"
        >

          <Container>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand href="/StartView">
              <div className="h6 text-secondary custom-text-logo text-center m-0">
                <img src="/img/logo/filmvisarna-logo-icon.png" className="d-block custom-logo-navbar mx-auto"></img>
                Filmvisarna
              </div>
            </Navbar.Brand>         
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
                <Nav className="justify-content-end flex-grow-1 fs-5">
                  {(user.userRole === "member") ?
                    <>
                      <Nav.Link href="/StartView/" onClick={logout}>Logga ut</Nav.Link>
                      <Nav.Link href="/AccountView">Mitt konto</Nav.Link>
                    </>
                    :
                    <>
                      <Nav.Link href="/LoginView">Logga in</Nav.Link>
                      <Nav.Link href="/RegisterView">Bli medlem</Nav.Link>
                    </>
                  }

                  <Nav.Link href="/StartView">Visas nu</Nav.Link>
                  <Nav.Link href="/CancelView">Avboka</Nav.Link>
                  <Nav.Link href="/AboutView">Om</Nav.Link>
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
