import React, { useState, useEffect } from "react"
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { del } from '../utilsAndHooks/rest';

export default function MainMenu({ user, setUser }) {
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    if (window.innerWidth < 992) {
      setMenuOpen(!menuOpen);
    }
  }
  const handleClose = () => setMenuOpen(false);

  async function logout() {
    try {
      await del('users/logout');
    } catch (error) {
      console.log("Error i logout: ", error);
    }
    toggleMenu();
    setUser();
    navigate("/");
  }

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand} expand={expand}
          className="navbar-dark navbar-bg"
        >
          <Container>
            <Navbar.Toggle aria-controls={`offcanvas Navbar-expand-${expand}`} onClick={toggleMenu} />
            <NavLink to="/StartView" className="nav-link">
              <div className="lg-logo">
                <div className="h6 text-secondary custom-text-logo text-center m-0">
                  <img src="/img/logo/filmvisarna-logo-icon.png" className="d-block custom-logo-navbar mx-auto"></img>
                  Filmvisarna
                </div>
              </div>
            </NavLink>
            <div></div>
            <Navbar.Offcanvas
              id={`offcanvas Navbar-expand-${expand}`}
              aria-labelledby={`offcanvas NavbarLabel-expand-${expand}`}
              placement="start"
              className="bg-dark text-light"
              restoreFocus={false}
              show={menuOpen}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvas NavbarLabel-expand-${expand}`}></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 fs-5">
                  {user.userRole === "member" ? (
                    <>
                      <NavLink to="/StartView/" className="nav-link" onClick={logout}>Logga ut</NavLink>
                      <NavLink to="/AccountView" className="nav-link" onClick={toggleMenu}>Mitt konto</NavLink>
                    </>
                  ) : user.userRole === "admin" ? (
                    <>
                      <NavLink to="/AdminView/" className="nav-link" onClick={toggleMenu}>Admin</NavLink>
                      <NavLink to="/StartView/" className="nav-link" onClick={logout}>Logga ut</NavLink>
                    </>
                  ) :
                    <>
                      <NavLink to="/LoginView" className="nav-link" onClick={toggleMenu}>Logga in</NavLink>
                      <NavLink to="/RegisterView" className="nav-link" onClick={toggleMenu}>Bli medlem</NavLink>
                    </>
                  }
                  <NavLink to="/StartView" className="nav-link" onClick={toggleMenu}>Visas nu</NavLink>
                  <NavLink to="/CancelView" className="nav-link" onClick={toggleMenu}>Avboka</NavLink>
                  <NavLink to="/AboutView" className="nav-link" onClick={toggleMenu}>Om</NavLink>
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