import { Outlet } from "react-router-dom";
import MainMenu from './components/MainMenu';
import Footer from './components/Footer';

export default function PageHolder() {
  return (
    <>
      <header>
        <MainMenu />
      </header>
      <main className="container mt-5">
          <Outlet context={[]} />
      </main>
      <footer className="container-fluid">
        <Footer />
      </footer>
    </>);
}