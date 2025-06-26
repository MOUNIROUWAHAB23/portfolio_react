import React from "react";
import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, onClick }) => (
  <Col xs={12} sm={6} md={4} className="mb-4">
    <div
      className="proj-imgbx clickable-card"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={title}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={{ minHeight: 260, boxShadow: "0 2px 12px rgba(79,140,255,0.07)" }}
    >
      <img
        src={imgUrl}
        alt={title}
        className="w-100"
        style={{
          height: "220px",
          objectFit: "cover",
          borderRadius: "16px",
          transition: "transform 0.4s cubic-bezier(.4,2,.6,1)"
        }}
      />
      <div className="proj-txtx">
        <h4 style={{ fontWeight: 700, marginBottom: 8 }}>{title}</h4>
        <span style={{ fontSize: "1em", opacity: 0.92 }}>{description}</span>
      </div>
    </div>
  </Col>
);

export default ProjectCard;