import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function MainMenu() {
return (
  <>
    {[false].map((expand) => (
      <Navbar key={expand} expand={expand} className="mb-3 bg-dark text-light">
        <Container fluid>
          <Navbar.Toggle className="border-0" aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Brand href="/StartView" className="text-primary">
            <img src="/public/logo_img/png/filmvisarna-logo-icon.png" className="custom-logo-navbar"></img>
          </Navbar.Brand>
          <div></div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
            className="bg-dark text-light"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title 
                id={`offcanvasNavbarLabel-expand-${expand}`}>
                {/* <div className="justify-content-center align-items-center h6 text-center text-primary">
                  <img src="/public/logo_img/png/filmvisarna-logo-icon.png" className="d-block custom-logo-offcanvas mb-2"></img>
                  Filmvisarna
                </div> */}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/StartView">Visas nu</Nav.Link>
                <Nav.Link href="/AccountView">Mitt konto</Nav.Link>
                <Nav.Link href="/CancelView">Avboka</Nav.Link>
                <Nav.Link href="/AboutView">Om oss</Nav.Link>
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