import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; // For redirecting after login
import { useAuth } from './AuthContext'; // ✅ Import AuthContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('');
    
  const { login } = useAuth(); // ✅ Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make API call to backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);
        const user = { name, email }; // Build user object manually
        login(user); // Update auth context
        navigate('/codeanalyzer'); // Redirect to home page or dashboard
      } else {
        // Login failed
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleLogin} className="p-4 bg-light rounded shadow-sm">
            <h1 className="text-center mb-4">Log In</h1>

            {/* Display error message if any */}
            {error && <div className="alert alert-danger">{error}</div>}

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="visually-hidden">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label className="visually-hidden">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button variant="success" type="submit">
                log In
              </Button>
            </div>

            <a href="#forgot-password" className="text-primary text-decoration-underline">
              Forgot Password?
            </a>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;