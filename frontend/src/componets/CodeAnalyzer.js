import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AnalysisResults from './AnalysisResults';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';

const CodeAnalyzer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisTime, setAnalysisTime] = useState(null);
  const [linesAnalyzed, setLinesAnalyzed] = useState(0);
  const [timer, setTimer] = useState(0);
  const [, setIntervalId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimer(0);

    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);

    const startTime = performance.now();

    try {
      const result = await analyzeCode(code);
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

      setAnalysisTime(timeTaken);
      setAnalysisResult(result);
      setLinesAnalyzed(code.split('\n').length); // ✅ Lines analyzed
      await handleSaveCode(code, result);
    } catch (err) {
      console.error("Error analyzing code:", err);
      alert("An error occurred: " + err.message);
    } finally {
      clearInterval(id);
      setIntervalId(null);
      setIsAnalyzing(false);
    }
  };

  const analyzeCode = async (code) => {
    const response = await fetch("http://localhost:8000/analyze-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) throw new Error("Failed to analyze code");

    return await response.json();
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
      console.error('Error saving code:', err);
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
              <div style={{ position: 'relative' }}>
                <Form.Control
                  as="textarea"
                  rows={8}
                  placeholder="Paste your code here."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  style={{
                    border: '2px solid #0d6efd',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    boxShadow: isAnalyzing ? '0px 0px 8px #0d6efd' : 'none',
                  }}
                />
              </div>
            </Form.Group>

            {/* ✅ Summary section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '15px' }}>
              {linesAnalyzed > 0 && (
                <div style={{ fontWeight: '500', color: '#333' }}>
                  📄 Lines Analyzed: {linesAnalyzed}
                </div>
              )}

              {isAnalyzing && (
                <div style={{ fontWeight: '500', color: '#0d6efd' }}>
                  ⏳ Timer: {timer}s
                </div>
              )}

              {analysisTime && (
                <div style={{ fontWeight: '500', color: '#333' }}>
                  ⏱️ Analysis Time: {analysisTime}s
                </div>
              )}
            </div>

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
        <AnalysisResults
          total={analysisResult.total}
          vulnerabilities={analysisResult.vulnerabilities}
          linesAnalyzed={analysisResult.lines_analyzed}
          processingTime={analysisTime}
        />
      )}
    </Container>
  );
};

export default CodeAnalyzer;
