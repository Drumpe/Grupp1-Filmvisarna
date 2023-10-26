import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutView = () => {

    return (

        <Container className='text-center'>
            <Row> 
                <Col className='mx-auto text-center'>
                    <Image src="/img/Aboutposter/Aboutpic.jpg" thumbnail />
                </Col>
            </Row>
            <div className=' container border border-light py-3 rounded-5 bg-info col-lg-8 mt-3'> 
            <Row>
                <Col className=' mt-3' >
                    <h1>Om oss</h1>
                    <p>
                        Välkommen till vår filmwebbplats, en plats där vår genuina passion för film och dess magiska värld är hjärtat i allt vi gör. Vi gläder oss åt att öppna våra dörrar och välkomna dig till vår gemenskap.
                    </p>
                    <p>
                        Vårt uppdrag är djupt förankrat i att förse dig med den allra senaste informationen om filmvärlden. Vi strävar efter att ge dig en omfattande inblick i kommande filmutgåvor, nyheter och spännande projekt. Vi ser det som vår stora ära att hjälpa dig att upptäcka de pärlor som filmvärlden har att erbjuda.
                    </p>
                    <p>
                        Bakom denna passionerade strävan finns vårt engagerade team, vars medlemmar är Ola, Yassein, Patrik, Arshia, Albin, Jimmie och Adis. Tillsammans delar vi vårt kunnande och vår kärlek till film med dig.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-flex flex-column ">
                        <h4>Kontakt info</h4>
                        <div> 
                          Du kan nå oss via e-post på <a href="#" >Filmvisarna@mail.com</a> eller ringa oss på 070-000 00 00. Vi ser fram emot att höra från dig och vara din guide in i den fantastiska världen av film.
                        </div>
                    </div>
                </Col>
            </Row>
            </div>
        </Container>
    );

}

export default AboutView;
