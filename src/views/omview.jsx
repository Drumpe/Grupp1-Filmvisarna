import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

const Omview = () => {

    return (
        <Container className="mt-5">
            <h1>Om oss</h1>
            <Row>
                <Col>
                    <a href="#">
                        <Card style={{}}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                            </Card.Body>
                            <Card.Title>Card Title</Card.Title>
                        </Card>
                    </a>
                </Col>
                <Col className="small">
                

                    <p>Välkommen till vår filmwebbplats! Vi brinner för film och vill dela vår kärlek till film med dig.</p>
                    <p>Vårt uppdrag är att förse dig med den senaste filmen och information om kommande släpp. Vi hoppas kunna hjälpa dig att upptäcka nya.</p>
                    <p>vårt team består av: Ola, Yassein, Patrik, Arsha, Albin, Jimmie</p>
                    <Button className="mb-3" variant="primary" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Liten present</Button>
                    <Card className="mt-3">
                    <Card.Title>Kontat info</Card.Title>
                    <Card.Body>Filmvisarna@mail.com   <br /> 07000000 </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>

    );

}

export default Omview;
