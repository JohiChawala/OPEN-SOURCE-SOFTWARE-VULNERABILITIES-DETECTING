import * as React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AnalysisResults = ({ results }) => {
  return (
    <Container as="section" className="mt-5" aria-label="Analysis Results">
      <Row>
        <Col>
          <h2 className="mb-4">Results</h2>
          <p>Vulnerabilities Detected: {results.hasVulnerabilities ? "Yes" : "No"}</p>
          <p>Total lines analyzed: {results.totalLines}</p>
          <p>Processing time: {results.processingTime} seconds</p>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Details:</Card.Title>
              {results.details.map((detail, index) => (
                <Card.Text key={index}>{detail}</Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalysisResults;
