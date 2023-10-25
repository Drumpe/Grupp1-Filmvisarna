import { Container, Row, Col, Image } from 'react-bootstrap';

export default function AboutView() {
    return (
        <Container >
            <Row>
                <Col className='mx-auto text-center'>
                    <Image src="/img/Aboutposter/Aboutpic.jpg" thumbnail />
                </Col>
            </Row>
            <Row  className='justify-content-center'>
                <Col style={{maxWidth: '621px'}}>
                    <h1 className="mb-4 text-primary d-inline-block">Om oss</h1>
                    <p>
                        Välkommen till vår filmwebbplats! Vi brinner för film och vill dela vår kärlek till film med dig.
                    </p>
                    <p>
                        Vårt uppdrag är att förse dig med den senaste filmen och information om kommande släpp. Vi hoppas kunna hjälpa dig att upptäcka nya filmer.
                    </p>
                    <p>
                        Vårt team består av: Ola, Yassein, Patrik, Arshia, Albin, Jimmie, Adis
                    </p>
                    <br />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col style={{maxWidth: '621px'}}>
                    <h5 className="mb-4 text-primary d-inline-block">Kontakt info</h5>
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