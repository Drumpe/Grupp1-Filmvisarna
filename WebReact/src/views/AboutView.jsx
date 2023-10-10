import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutView = () => {

    return (

        <Container >
            <Row> 
                <Col className='mx-auto text-center'>
                    <Image src="/img/Aboutposter/Aboutpic.jpg" thumbnail />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Om oss</h1>
                    <p>
                        Välkommen till vår filmwebbplats! Vi brinner för film och vill dela vår kärlek till film med dig.
                    </p>
                    <p>
                        Vårt uppdrag är att förse dig med den senaste filmen och information om kommande släpp. Vi hoppas kunna hjälpa dig att upptäcka nya filmer.
                    </p>
                    <p>
                        Vårt team består av: Ola, Yassein, Patrik, Arsha, Albin, Jimmie, Adis
                    </p>
                </Col>
            </Row>
            <Row>
                <Col >
                    <div className="d-flex flex-column">
                        <h5>Kontakt info</h5>
                        <div>
                            Filmvisarna@mail.com <br /> 07000000
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );

}

export default AboutView;
