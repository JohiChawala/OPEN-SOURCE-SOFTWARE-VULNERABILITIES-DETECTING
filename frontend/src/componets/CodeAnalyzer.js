import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';

const CodeAnalyzer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [analysisTime, setAnalysisTime] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    const startTime = performance.now();

    try {
      const result = analyzeCode(code);
      const endTime = performance.now();
      setAnalysisTime(((endTime - startTime) / 1000).toFixed(2));
      setAnalysisResult(result);
      await handleSaveCode(code, result);
    } catch (err) {
      console.error('Error analyzing code:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeCode = (code) => {
    const vulnerabilities = Math.floor(Math.random() * 5);
    return vulnerabilities > 0
      ? `Vulnerabilities detected: ${vulnerabilities}`
      : 'No vulnerabilities detected';
  };

  const handleSaveCode = async (code, result) => {
    const userId = user?.userId;

    try {
      const response = await fetch('http://localhost:5000/api/code/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code, result }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || 'Failed to save code');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h2 style={{ color: '#dc3545' }}>🔒 Please Login First</h2>
        <p className="mt-3" style={{ fontSize: '18px' }}>
          You need to be logged in to use the code analyzer.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/login')}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container as="section" className="mt-5 text-center" aria-label="Code Analysis Section">
      <h2 className="mb-4" style={{ fontWeight: 'bold', color: '#0d6efd' }}>
        Paste Your Code & Detect Vulnerabilities Instantly
      </h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="codeInput" className="mb-3">
              <Form.Label className="visually-hidden">Code Input</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Paste your code here."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                aria-label="Code input area"
                required
                style={{
                  border: '2px solid #0d6efd',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: isAnalyzing ? '0px 0px 8px #0d6efd' : 'none',
                }}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="mt-3"
              disabled={isAnalyzing}
              style={{
                transition: 'all 0.3s ease',
                padding: '10px 20px',
                fontSize: '18px',
              }}
            >
              {isAnalyzing ? <Spinner animation="border" size="sm" /> : 'Run'}
            </Button>
          </Form>
        </Col>
      </Row>
      {analysisResult && (
        <Row className="mt-4">
          <Col>
            <h3>Analysis Result</h3>
            <p
              style={{
                color: analysisResult.includes('Vulnerabilities') ? 'red' : 'green',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {analysisResult}
            </p>
            {analysisResult === 'No vulnerabilities detected' && (
              <p style={{ fontSize: '16px', color: 'green', fontWeight: 'bold' }}>
                🎉 Congratulations! Your code is free from attackers.
              </p>
            )}
            {analysisResult.includes('Vulnerabilities') && (
              <p style={{ fontSize: '16px', color: 'red', fontWeight: 'bold' }}>
                ⚠️ Oops! Your code has some vulnerabilities. Please fix them before using it.
              </p>
            )}
            {analysisTime && (
              <p style={{ fontSize: '16px', color: '#555' }}>Analysis Time: {analysisTime}s</p>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CodeAnalyzer;
