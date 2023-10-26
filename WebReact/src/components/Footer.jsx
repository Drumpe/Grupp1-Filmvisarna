import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
	return (
	    <footer className="footer mt-auto py-2 navbar-bg">
			<div className='text-center p-3'>
        &copy; {new Date().getFullYear()} Copyright Filmvisarna
		</div>
		</footer>
	);
}
