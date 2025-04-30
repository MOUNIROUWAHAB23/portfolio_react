

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";  // Assurez-vous que le chemin est correct
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Envoyer');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code === 200) {
      setStatus({ success: true, message: 'Message sent successfully' });
    } else {
      setStatus({ success: false, message: 'Something went wrong, please try again later.' });
    }
  };

  return (
    <section className="contact mt-5" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeInLeft" : ""}>
                  <img src={contactImg} alt="Contact Us" className="contact-image"/>
                </div>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={`contact-form-wrapper ${isVisible ? "animate__animated animate__fadeInRight" : ""}`}>
                  <h2>Contactez-moi</h2>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <Row>
                      <Col sm={6} className="px-1">
                        <input type="text" value={formDetails.firstName} placeholder="Prénom" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                      </Col>
                      <Col sm={6} className="px-1">
                        <input type="text" value={formDetails.lastName} placeholder="Nom" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                      </Col>
                      <Col sm={6} className="px-1">
                        <input type="email" value={formDetails.email} placeholder="mail" onChange={(e) => onFormUpdate('email', e.target.value)} />
                      </Col>
                      <Col sm={6} className="px-1">
                        <input type="tel" value={formDetails.phone} placeholder="Téléphone." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                      </Col>
                      <Col sm={12} className="px-1">
                        <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      </Col>
                      <Col sm={12} className="px-1 text-center">
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                      {status.message && (
                        <Col sm={12}>
                          <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
