import * as React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AnalysisResults = ({ total, vulnerabilities }) => {
  return (
    <Container as="section" className="mt-5" aria-label="Analysis Results">
      <Row>
        <Col>
          <h3>Analysis Result</h3>
          <p
            style={{
              color: total === 0 ? 'green' : 'red',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            {total === 0
              ? '🎉 Congratulations! Your code is free from attackers.'
              : `⚠️ Oops! Your code has ${total} vulnerabilities.`}
          </p>

          {vulnerabilities?.length > 0 && (
            <div style={{ textAlign: 'left', fontSize: '16px', paddingLeft: '10px' }}>
              {vulnerabilities.map((vuln, index) => (
                <Card
                  key={index}
                  className="mb-3"
                  style={{ background: '#f9f9f9', borderColor: '#ddd' }}
                >
                  <Card.Body>
                    <Card.Title>
                      🔍 <strong>{vuln.keyword}</strong> on line(s): {vuln.lines.join(', ')}
                    </Card.Title>
                    <ul>
                      {vuln.cves.map((cve, idx) => (
                        <li key={idx}>
                          <strong>{cve.cve_id}</strong>: {cve.description}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          
        </Col>
      </Row>
    </Container>
  );
};

export default AnalysisResults;
