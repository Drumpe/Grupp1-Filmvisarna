import { Container, Image } from 'react-bootstrap';

export default function CancelView() {
return (
	<Container>
        <Image src="holder.js" alt="Logo" className='img-fluid mx-auto d-block'/>
        <br />
        <h1>Avbokning</h1>
        <hr />
        <br />
        <form method="post" className='row g-3 '> 
        <label htmlFor="inputBookingNumber">Bokningsnummer</label>
        <input type="text" placeholder='XXX-XXX' className='col-7  p-3'/>
        <button type="submit" className="btn btn-primary col-6">Avboka</button>   
        </form>

        <hr />
        Någon typ av alert och sedan respons skall ges
	</Container>
);
}