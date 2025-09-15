import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",     // fixed at top
        top: 0,
        left: 0,
        width: "100%",         // full width
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        backgroundColor: "#007bff",
        color: "#fff",
        gap: "1rem",
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
      <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link>
      <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link>
      <a href="/resume.pdf" target="_blank" style={{ color: "#fff", textDecoration: "none" }}>Resume</a>
    </nav>
  );
};

export default Navbar;
