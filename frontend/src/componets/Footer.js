import * as React from "react";
import { Container } from "react-bootstrap";
import '../css/Footer.css';

const Footer = () => {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        {/* Main content goes here */}
      </div>
      <footer className="footer py-3" role="contentinfo">
        <Container className="text-center">
          &copy; {new Date().getFullYear()} Cyber C. All rights reserved.
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
