import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/Disk-cleaner.png";
import projImg2 from "../assets/img/E-maillot.png";
import projImg3 from "../assets/img/AR-stage.png";
import projImg4 from "../assets/img/Arimayi-stage.png";
import projImg5 from "../assets/img/Tv-shows.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const projects = [
    {
      title: "Reeway-Backend python(django) developper",
      description: "Swagger documentation avec Django, API development, tests unitaires.",
      imgUrl: projImg4,
      onClick: () => handleProjectClick("reeway-backend"),
    },
    {
      title: "AugustinRuinard.com",
      description: "Site vitrine pour un établissement supérieur.",
      imgUrl: projImg3,
      onClick: () => handleProjectClick("augustinruinard"),
    },
    {
      title: "E-Maillot",
      description: "Plateforme e-commerce sportive.",
      imgUrl: projImg2,
      onClick: () => handleProjectClick("e-maillot"),
    },
    {
      title: "Disk Cleaner",
      description: "Optimisation de stockage.",
      imgUrl: projImg1,
      onClick: () => handleProjectClick("disk-cleaner"),
    },
    {
      title: "Dev-mobile (Kotlin)",
      description: "Développement d'une application mobile de séries télévisées.",
      imgUrl: projImg5,
      onClick: () => handleProjectClick("dev-mobile"),
    },
    // Ajoute d'autres projets ici si besoin
  ];

  // Gestionnaire de clic générique
  const handleProjectClick = (projectId) => {
    // Navigation ou modal ici si besoin
    console.log(`Projet cliqué : ${projectId}`);
  };

  return (
    <section className="project mt-5" id="projects">
      <Container>
        <Row>
          <Col xs={12}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="colorism">Projets</h2>
                  <p>Découvrez mes réalisations techniques et créatives.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Projets phares</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Autres projets</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.slice(0, 3).map((project, index) => (
                            <ProjectCard key={index} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <p>Projets secondaires et collaborations.</p>
                        <Row>
                          {projects.slice(3).map((project, index) => (
                            <ProjectCard key={index + 3} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt="Background decoration"
        style={{ position: "absolute", right: 0, bottom: 0, zIndex: -1, opacity: 0.18, pointerEvents: "none" }}
      />
    </section>
  );
};

export default Projects;