import { Outlet, Link } from 'react-router-dom';

/* Är bara en test sida, radera den när den inte behövs! */
export default function TestView() {
    return (
        <>
        <h1>Test page</h1>
        <Link to="/om">Till om</Link>
        </>
    );
};