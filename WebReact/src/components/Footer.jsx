import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect } from 'react';



export default function Footer() {
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    document.getElementById('curYr').innerHTML = year;
  }, []);

  return (
    <footer>
      <div className="footer-container">
        <p className="copyright-year">&copy; 2023 &mdash; <span id="curYr"></span></p>
        <ul className="footer-links">
          <li><a href="#">Om oss</a></li>
          <li><a href="#">Kontakta oss</a></li>
        </ul>
      </div>
    </footer>
  );
}
