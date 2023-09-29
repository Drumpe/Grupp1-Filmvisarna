import { Outlet } from "react-router-dom";
import MainMenu from './components/MainMenu';
import Footer from './components/Footer';
import { Container, Row, Col } from 'react-bootstrap';

export default function PageHolder() {
  return (
    <>
      <header>
        <MainMenu />
      </header>
      <main>
        <Container className="mt-5">
          <Outlet context={[]} />
        </Container>
      </main>
      <footer className="container-fluid">
        <Footer />
      </footer>
    </>);
}