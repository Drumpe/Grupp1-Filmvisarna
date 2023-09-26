// Only import your sass in App (not every component)
import "./sass/main.scss";

// Import some Bootstrap components
import MainMenu from './components/MainMenu';
import StartView from './views/StartView';
import AboutView from "./views/AboutView";
import Footer from './components/Footer';
import { Container, Row, Col } from 'react-bootstrap';


export default function App() {
  return <>
    <MainMenu /> 
    <Container className="mt-5">
      <Row>
        <Col>
          <StartView />
        </Col>
      </Row>
    </Container>
    <Container className="position-absolute bottom-0">
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  </>;
}