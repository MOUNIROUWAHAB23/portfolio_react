import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import "./Banner.css";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(250 - Math.random() * 100);
  const toRotate = ["Développeur Fullstack", "Web Designer", "UI/UX Designer"];
  const period = 1800;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
    // eslint-disable-next-line
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prev) => prev / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline mt-5">Bienvenue sur mon Portfolio</span>
                  <h1 className="title-banner">
                    Bonjour ! Moi c’est <span className="highlight">Godlight</span>
                    <br />
                    <span className="txt-rotate">
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p className="description-banner">
                    Développeur spécialisé en développement web et création d'applications modernes.<br />
                    Passionné par le code et les nouvelles technologies, j'aime travailler sur des projets innovants.
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{
                      marginTop: "24px",
                      borderRadius: "12px",
                      padding: "12px 28px",
                      fontWeight: 700,
                      fontSize: "18px",
                      boxShadow: "0 2px 12px rgba(79, 140, 255, 0.10)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onClick={() => window.location.href = "#contact"}
                  >
                    Contactez-moi <ArrowRightCircle size={25} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};