import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

function BasicExample() {
  return (
    <Container >
        <Row>
            <Col className='d-flex justify-content-center'>
                <Card >
                    <Image style={{width: '35em', height: '20em'}} src="/img/poster/awake.jpg"  fluid rounded />
                </Card>
            </Col>
        </Row>
        <Row>
            <Col className=' d-flex justify-content-center'>
                <Card className='bg-transparent text-light' style={{ width: '25rem' }}>
                    <Card.Body>
                    <Card.Title>Awake</Card.Title>
                        <Card.Text className='mt-3'>
                            En global händelse har förstört människors förmåga att somna och en före detta soldat 
                            kämpar för att rädda sin familj, alltmedan samhället och hennes tankar faller isär.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col className=' d-flex justify-content-center' >
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Datum
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">29/9</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">01/10</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">02/10</Dropdown.Item>
                    </Dropdown.Menu>                                                                            
                </Dropdown>
            </Col>
        </Row>
        <Row>
            <Col className=' d-flex justify-content-center'>
                <Card className='mt-2 bg-transparent text-light' style={{ width: '25rem'} }>
                    <ListGroup variant="flush">
                        <ListGroup.Item className='bg-transparent text-light'>Tid: 12:00 | Salong 1 </ListGroup.Item>
                        <ListGroup.Item className='bg-transparent text-light'>Tid: 16:00 | Salong 2</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col className=' d-flex justify-content-center'>
                <Link to='/TheaterView'>
                    <Button className=' mt-2' variant="primary" style={{width: '25rem'}}>
                        Välj visning
                    </Button>{''}
                </Link>
            </Col>
        </Row>
    </Container>
  );
}

export default BasicExample;