import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../css/Root.css';
const Root = () => {
  return (
    <div style={{overflow:"hidden"}}>
      <Container fluid className="root-container d-flex w-100 vh-100 justify-content-center align-items-center">
      <Row>
        <Col xs={12} sm={12} md={12}>
          <p className="welcome-text">
            <span>Welcome</span>{' '}
            <span>To</span>{' '}
            <span>Vulnerability</span>{' '}
            <span>Detector!</span>
          </p>
          <p className="second-paragraph">
            Check your code vulnerabilities with ease.
          </p>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default Root;