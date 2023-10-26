import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutView = () => {

    return (

        <Container >
            <Row>
                <Col className="w-100 mx-auto text-center">
                    <img src="/img/hero/hero-1.png" className="w-100 d-lg-none" />
                    <img src="/img/hero/hero-2.png" className="w-100 d-none d-lg-block" />
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
                </Col>
            </Row>
            <Row>
                <Col >
                    <div className="d-flex flex-column">
                        <h5 className="text-primary">Kontakt</h5>
                        <p>Behöver du komma i kontakt med oss? Skriv till oss på: <a href="mailto:fvisarna@gmail.com">fvisarna@gmail.com</a></p>
                    </div>
                </Col>
            </Row>
        </Container>
    );

}

export default AboutView;
