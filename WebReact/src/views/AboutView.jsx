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
                    <h1>Om oss</h1>
                    <p>
                        Välkommen till vår filmwebbplats! Vi brinner för film och vill dela vår kärlek till film med dig.
                    </p>
                    <p>
                        Vårt uppdrag är att förse dig med den senaste filmen och information om kommande släpp. Vi hoppas kunna hjälpa dig att upptäcka nya filmer.
                    </p>
                    <p>
                        Vårt team består av: Ola, Yassein, Patrik, Arshia, Albin, Jimmie, Adis
                    </p>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col style={{maxWidth: '621px'}}>
                    <h5>Kontakt info</h5>
                    <div>
                        Filmvisarna@mail.com <br /> 07000000
                    </div>
                </Col>
            </Row>
        </Container>
    );
}