import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is loaded
import '../css/About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Importing team images from assets folder
import team1 from '../assets/team1.jpg';
import team2 from '../assets/team2.jpg';
import team3 from '../assets/team3.jpg';

const teamMembers = [
  { name: "Ramim Ali Siddiqui", role: "AI Specialist", img: team1 },
  { name: "Johi Chawla", role: "Cybersecurity Expert", img: team2 },
  { name: "Lareb Arain", role: "Software Engineer", img: team3 }
];

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Container className="my-5 text-center">
      <Row>
        <Col>
          <h1 className="text-primary fw-bold display-4" data-aos="fade-up">About</h1>
        </Col>
      </Row>
      
      <Row className="mt-4 justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg p-4 border-0 about-card" data-aos="zoom-in">
            <Card.Body>
              <h2 className="text-dark fw-bold">Our Mission & Vision</h2>
              <p className="text-muted">
                Our goal is to make open-source software <b>safer and more resilient</b> using AI-powered solutions. 
                We believe in a future where developers can write <b>secure code effortlessly</b>, and our technology 
                empowers them to do so with <b>precision and confidence</b>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4 justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg p-4 border-0 about-card" data-aos="fade-up">
            <Card.Body>
              <h2 className="text-dark fw-bold">Using AI to Detect Vulnerabilities in Open-Source Software</h2>
              <p className="text-muted">
                Our <b>advanced AI-powered tool</b> revolutionizes code security by performing <b>deep analysis</b> 
                to detect vulnerabilities that traditional methods often miss. It not only identifies potential risks 
                but also provides <b>intelligent recommendations</b> to enhance your software’s security, efficiency, and reliability. 
                With <b>cutting-edge machine learning algorithms</b>, we empower developers to write <b>safer code, mitigate threats proactively,</b> 
                and build <b>robust applications with confidence</b>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-5 justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg p-4 border-0 about-card" data-aos="flip-left">
            <Card.Body>
              <h3 className="text-primary fw-bold">How It Works</h3>
              <ul className="list-unstyled mt-3 text-muted">
                <li className="mb-3">
                  <strong className="text-dark">📤 Upload Your Code:</strong> Start by uploading your source code to our platform.
                </li>
                <li className="mb-3">
                  <strong className="text-dark">🤖 AI-Powered Analysis:</strong> Our AI scans your code for potential vulnerabilities and flags areas that require attention.
                </li>
                <li className="mb-3">
                  <strong className="text-dark">📊 Detailed Results:</strong> Review a detailed report with highlighted vulnerabilities and recommendations for remediation.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col>
          <h2 className="text-primary fw-bold" data-aos="fade-up">Meet Our Team</h2>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        {teamMembers.map((member, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className="shadow-lg border-0 team-card" data-aos="fade-up">
              <Card.Img variant="top" src={member.img} className="team-img" alt={member.name} />
              <Card.Body>
                <h4 className="text-dark fw-bold">{member.name}</h4>
                <p className="text-muted">{member.role}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      

      <Row className="mt-5">
        <Col>
          <h2 className="text-primary fw-bold" data-aos="fade-up">Ready to Secure Your Code?</h2>
          <Button 
              variant="primary" 
              size="lg" 
              className="mt-3" 
              data-aos="zoom-in"
              onClick={() => window.location.href = '/codeanalyzer'}
            >
              Try Our AI Tool Now
            </Button>

        </Col>
      </Row>
    </Container>
  );
};

export default About;
