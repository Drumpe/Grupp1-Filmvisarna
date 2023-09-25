import { Link } from 'react-router-dom';

/* Är bara en test sida, radera den när den inte behövs! */
export default function TestView() {
    return (
        <>
        <h1>Om</h1>
        <Link to="/test">Till test</Link>
        </>
    );
};