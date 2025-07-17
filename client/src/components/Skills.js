import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";
import './Skills.css'; // ✅ Ajout du fichier de style
import './Banner.css'

export const Skills = () => {
  const [progressValues, setProgressValues] = useState([0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("skills");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setProgressValues([80, 90, 95]); // Déclenche l'animation une fois dans la vue
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const skills = [
    { value: progressValues[0], text: "Web Development" },
    { value: progressValues[1], text: "Code Testing" },
    { value: progressValues[2], text: "Logo/UI Design" },
  ];

  return (
    <section className="skill mt-5 md-5" id="skills">
      <div className="container">
        <div className="row">
          <div className="text-center">
            <div className="skill-bx wow zoomIn">
              <h2 className="colorism">Compétences</h2>
              <p className="description-banner">
                En tant que développeur full-stack passionné, UI/UX designer et intégrateur web,
                je maîtrise l'ensemble du cycle de création d'une application web, de la conception à la mise en production.
                <br />
                Je conçois des interfaces centrées sur l'utilisateur avec Figma ou Adobe XD,
                tout en assurant leur intégration responsive avec HTML, CSS (SASS/Tailwind), et JavaScript.
                <br />
                Côté développement, je travaille avec des stacks modernes comme React, Node.js, Express,
                et je manipule des bases de données relationnelles (PostgreSQL, MySQL) et NoSQL (MongoDB).
                <br />
                Mon approche est axée sur la performance, l'accessibilité, et l'expérience utilisateur.
              </p>

              <Carousel
                responsive={responsive}
                infinite={true}
                className="mt-5 owl-carousel owl-theme skill-slider"
              >
                {skills.map((skill, index) => (
                  <div className="item" key={index}>
                    <div style={{ width: 120, height: 120, margin: "0 auto" }}>
                      <svg width="0" height="0">
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#5170FF" />
                            <stop offset="100%" stopColor="#ff66c4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <CircularProgressbar
                        value={skill.value}
                        text={`${skill.value}%`}
                        styles={buildStyles({
                          textColor: "#d07cff",
                          pathColor: `url(#gradient-${index})`,
                          trailColor: "#eee",
                          strokeLinecap: "round",
                        })}
                      />
                    </div>
                    <h5>{skill.text}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      {/* <img className="background-image-left" src={colorSharp} alt="Image" /> */}
    </section>
  );
};

export default Skills;
