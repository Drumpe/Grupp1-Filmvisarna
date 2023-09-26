import { Outlet } from "react-router-dom";
import MainMenu from './components/MainMenu';
import Footer from './components/Footer';
import { Container, Row, Col } from 'react-bootstrap';

export default function PageHolder() {
    return (
      <>
        <MainMenu />
        <Container className="mt-5">
            <Outlet />
        </Container>
        <Container className="position-absolute bottom-0">
          <Row>
            <Col>
              <Footer />
            </Col>
          </Row>
        </Container>
      </>);
  }