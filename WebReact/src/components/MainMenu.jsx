import React, { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { del } from '../utilsAndHooks/rest';


export default function MainMenu({user, setUser}) {
  let navigate = useNavigate();
  async function logout() {
    try {
      await del('users/logout');
    } catch (error) {
      console.log("Error i logout: ", error);
    }
    setUser();
    navigate("/");
  }

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand} expand={expand}
          className="mb-3 navbar-dark fixed-top bg-info"
        >

          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvas Navbar-expand-${expand}`} />
            <NavLink to="/StartView" className="nav-link">
              <div className="h6 text-secondary custom-text-logo text-center m-0">
                <img src="/img/logo/filmvisarna-logo-icon.png" className="d-block custom-logo-navbar mx-auto"></img>
                Filmvisarna
              </div>
            </NavLink>
            <div></div>
            <Navbar.Offcanvas
              id={`offcanvas Navbar-expand-${expand}`}
              aria-labelledby={`offcanvas NavbarLabel-expand-${expand}`}
              placement="start"
              className="bg-dark text-light"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvas NavbarLabel-expand-${expand}`}></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 fs-5">
                  {(user.userRole === "member") ?
                    <>
                      <NavLink to="/StartView/" className="nav-link" onClick={logout}>Logga ut</NavLink>
                      <NavLink to="/AccountView" className="nav-link">Mitt konto</NavLink>
                    </>
                    :
                    <>
                      <NavLink to="/LoginView" className="nav-link">Logga in</NavLink>
                      <NavLink to="/RegisterView" className="nav-link">Bli medlem</NavLink>
                    </>
                  }

                  <NavLink to="/StartView" className="nav-link">Visas nu</NavLink>
                  <NavLink to="/CancelView" className="nav-link">Avboka</NavLink>
                  <NavLink to="/AboutView" className="nav-link">Om</NavLink>
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
