import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import logoperso from "../assets/img/logoperso.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
// import navIcon2 from "../assets/img/nav-icon2.svg";
import github from "../assets/img/github-mark-white.svg";
// import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <img src={logoperso} alt="Logo" className="logo" />
            <p>&copy; {new Date().getFullYear()} Spacefolio. Tout droits réservés.</p>
          </Col>
          <Col md={4}>
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li><a href="#home">Accueil</a></li>
              <li><a href="#projects">Projets</a></li>
              <li><a href="#skills">Compétences</a></li>
              <li><a href="#contact">Contactez-moi</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>suivez-moi</h5>
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/wahab-mounirou-161786253/"><img src={navIcon1} alt="Icon" /></a>
              <a href="https://github.com/MOUNIROUWAHAB23"><img src={github} alt="Icon" /></a>
              {/* <a href="#"><img src={navIcon3} alt="Icon" /></a> */}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
