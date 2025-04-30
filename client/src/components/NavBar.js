import React, { useState, useEffect } from "react";
import { Navbar, Nav,Col, Container } from "react-bootstrap";
import logoperso from '../assets/img/logoperso.png';
import development from '../assets/img/development.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
// import navIcon2 from '../assets/img/nav-icon2.svg';
// import navIcon3 from '../assets/img/nav-icon3.svg';
import CV from '../assets/font/cvvvv.pdf';
import github from "../assets/img/github-mark-white.svg";
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
      <div className="navstyle">
        <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
          {/* <Container className="navstyle"> */}
          <Navbar.Brand href="/">
            <img src={logoperso} alt="Logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navbar-nav">
              <Nav.Link href="#home" onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#skills" onClick={() => onUpdateActiveLink('skills')}>Compétences</Nav.Link>
              <Nav.Link href="#projects" onClick={() => onUpdateActiveLink('projects')}>Projets</Nav.Link>
              <Nav.Link href="#p" onClick={() => onUpdateActiveLink('projects')}>Projets</Nav.Link>
              
              <Nav.Link href={CV} target="_blank">Mon CV</Nav.Link>

            </Nav>
            {/* <span className="navbar-text"> */}
          <Col md={2}>
           
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/wahab-mounirou-161786253/" target="_blank" ><img src={navIcon1} alt="Icon" /></a>
              <a href="https://github.com/MOUNIROUWAHAB23" target="_blank" ><img src={github} alt="Icon" /></a>
              {/* <a href="#"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a> */}
            </div>
            <HashLink to='#connect'>
              {/* <button className="vvd"><span>Contactez-moi</span></button> */}
            </HashLink>
            </Col>
          
            {/* </span> */}
          </Navbar.Collapse>
          {/* </Container> */}
        </Navbar>
      </div>

    </Router>
  )
}
export default NavBar;
