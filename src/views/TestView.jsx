import { Outlet, Link } from 'react-router-dom';

export default function TestView() {
    return (
        <>
        <h1>Test page</h1>
        <Link to="/om">Till om</Link>
        </>
    );
};