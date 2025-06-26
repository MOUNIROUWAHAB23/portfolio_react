import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import logoperso from "../assets/img/logo1.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import github from "../assets/img/github-mark-white.svg";

export const Footer = () => (
  <footer className="footer mt-5">
    <Container>
      <Row className="align-items-center">
        <Col md={4} className="mb-4 mb-md-0 text-center text-md-start">
          
          <a href="#home">
            <img src={logoperso} alt="Logo" className="logo mb-2" />
          </a>
          <p className="mb-0" style={{ fontWeight: 500, fontSize: "1em" }}>
            &copy; {new Date().getFullYear()} Spacefolio. Tous droits réservés.
          </p>
        </Col>
        <Col md={4} className="mb-4 mb-md-0 text-center">
          <h5 className="mb-3">Liens utiles</h5>
          <ul className="list-unstyled d-flex flex-column gap-2 align-items-center">
            <li><a href="#home">Accueil</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#skills">Compétences</a></li>
            <li><a href="#contact">Contactez-moi</a></li>
          </ul>
        </Col>
        <Col md={4} className="text-center text-md-end">
          <h5 className="mb-3">Suivez-moi</h5>
          <div className="social-icon d-flex justify-content-center justify-content-md-end gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/wahab-mounirou-161786253/"
              aria-label="LinkedIn"
            >
              <img src={navIcon1} alt="LinkedIn" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MOUNIROUWAHAB23"
              aria-label="GitHub"
            >
              <img src={github} alt="GitHub" />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;