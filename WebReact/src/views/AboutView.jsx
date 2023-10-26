import { Container, Row, Col, Image } from 'react-bootstrap';

export default function AboutView() {
    return (
        <Container >
            <Row>
                <Col className="w-100 mx-auto text-center">
                    <img src="/img/hero/hero-1.png" className="w-100" />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h1>Om oss</h1>
                    <p>
                        Välkommen till Filmvisarna! Vi brinner för film och vill dela vår kärlek till film med dig.
                    </p>
                    <p>
                        Vårt team består av: Ola, Yassein, Patrik, Arshia, Albin, Jimmie, Adis.
                    </p>
                    <br />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col className='w-100'>
                    <h5 className="mb-4 d-inline-block">Kontaktinfo</h5>
                    <div>
                        <a href="mailto:Fvisarna@gmail.com">Fvisarna@gmail.com </a>
                        <br /> 
                        <a href="tel:+4670000000">+46 (0)700 00 00 00</a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}