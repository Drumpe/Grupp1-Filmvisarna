import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
	return (
		<footer className="footer mt-auto py-3 bg-info">
			<div className='text-center p-3'>
        &copy; {new Date().getFullYear()} Copyright Filmvisarna
		</div>
		</footer>
	);
}