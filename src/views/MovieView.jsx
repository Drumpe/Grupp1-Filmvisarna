import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <div>
        <Container className="d-flex justify-content-center ">
            <Row>
                <Col>
                <Card style={{ width: '25rem', height: '15rem' }}>
                <Card.Body>
                    <Image src="holder.js/171x180" rounded />
                </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col className='d-flex mt-5 custom-movieTitle-Paddig'>
                    <div>
                        <h1> Filmtitel</h1>
                        <h4 className='mt-4'>information om filmen</h4>
                    </div>
                    
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col className='d-flex mt-3 custom-movieTitle-Paddig'>
                    <h2>Köp biljetter</h2>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col className='d-flex custom-movieTitle-Paddig mt-3'>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Välj dag
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col className='d-flex mt-2 custom-movieTitle-Paddig'>
                    <div className="mb-2">
                        <Link to='/TheatherView'>
                            <Button variant="primary" size="lg">
                                Välj plats
                            </Button>{''}
                        </Link>
                    </div>
                    
                </Col>
            </Row>
        </Container>
        </div>
    
  );
}

export default BasicExample;