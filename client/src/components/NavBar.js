import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logoperso from "../assets/img/logo1.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import github from "../assets/img/github-mark-white.svg";
import CV from "../assets/font/cvvvv.pdf";
import { HashLink } from "react-router-hash-link";
import { BrowserRouter as Router } from "react-router-dom";


export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => setActiveLink(value);

  return (
    <Router>
      <Navbar
        expand="md"
        className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src={logoperso} alt="Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                href="#home"
                className={activeLink === "home" ? "active nav-link" : "nav-link"}
                onClick={() => onUpdateActiveLink("home")}
              >
                Accueil
              </Nav.Link>
              <Nav.Link
                href="#skills"
                className={activeLink === "skills" ? "active nav-link" : "nav-link"}
                onClick={() => onUpdateActiveLink("skills")}
              >
                Compétences
              </Nav.Link>
              <Nav.Link
                href="#projects"
                className={activeLink === "projects" ? "active nav-link" : "nav-link"}
                onClick={() => onUpdateActiveLink("projects")}
              >
                Projets
              </Nav.Link>
              <Nav.Link
                href={CV}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Mon CV
              </Nav.Link>
              <div className="navbar-social d-flex align-items-center ms-3">
                <a
                  href="https://www.linkedin.com/in/wahab-mounirou-161786253/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <img src={navIcon1} alt="LinkedIn" />
                </a>
                <a
                  href="https://github.com/MOUNIROUWAHAB23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <img src={github} alt="GitHub" />
                </a>
              </div>
              <HashLink to="#connect" className="ms-3">
                <button className="btn btn-primary navbar-contact-btn" onClick={() => window.location.href = "#contact"}>
                  Contactez-moi
                
                </button>
              </HashLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
};

export default NavBar;