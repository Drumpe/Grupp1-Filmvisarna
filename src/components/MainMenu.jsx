import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function MainMenu() {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar 
          key={expand} expand={expand} 
          className="mb-3 navbar-dark"
          >

          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand href="/StartView">
                <div className="h6 text-secondary custom-text-logo text-center m-0">
                  <img src="/public/img/logo/filmvisarna-logo-icon.png" className="d-block custom-logo-navbar mx-auto"></img>
                  Filmvisarna
                </div>
            </Navbar.Brand>
            <div></div>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              data-bs-theme="dark"
              className="bg-dark text-light"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/StartView">Visas nu</Nav.Link>
                  <Nav.Link href="/AccountView">Mitt konto</Nav.Link>
                  <Nav.Link href="/CancelView">Avboka</Nav.Link>
                  <Nav.Link href="/AboutView">Om oss</Nav.Link>
                  <Nav.Link href="/RegisterView">Registrera</Nav.Link>
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
        </Navbar>
      ))}
    </>
  );
}
