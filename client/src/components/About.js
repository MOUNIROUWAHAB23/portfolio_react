// src/components/About.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export const About = () => {
  return (
    <Container id="about" className="my-5">
      <Row>
        <Col md={4}>
          <Image src="votre-photo.jpg" roundedCircle fluid />
        </Col>
        <Col md={8}>
          <h2>À propos de moi</h2>
          <p>
            Je suis développeur spécialisé en développement web et en création d'applications modernes. 
            Passionné par le code et les nouvelles technologies, j'aime travailler sur des projets innovants.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
