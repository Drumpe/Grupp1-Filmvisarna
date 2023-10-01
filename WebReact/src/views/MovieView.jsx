import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

function BasicExample() {
  return (
<Container >
        <Row>
            <Col className='offset-1'>
                <Card style={{width: '90%', height: '15rem' }}>
                    <Card.Body >
                        <Image src="holder.js/171x180" rounded />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col className='offset-1 mt-2'>
                <h1> Filmtitel</h1>
                <h4>Om filmen</h4>
                <h5>info om filmen,info om filmen,info om filmen,info om filmen,info om filmen,</h5>
            </Col>
        </Row>
        <Row>
            <Col className='offset-1 mt-2' >
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
            <Col>
                <Card className='offset-1 mt-1' style={{ width: '25rem' }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>12:00 Salong 1</ListGroup.Item>
                        <ListGroup.Item>16:00 Salong 2</ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                <Link to='/ConfirmedView'>
                    <Button className='offset-1 mt-2' variant="primary" style={{width: '25rem'}}>
                        Välj visning
                    </Button>{''}
                </Link>
            </Col>
        </Row>
    </Container>
  );
}

export default BasicExample;