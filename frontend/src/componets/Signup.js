import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // ✅ Import AuthContext

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth(); // ✅ Get login function from context

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', JSON.stringify(data, null, 2));


        // const user = { name, email }; // Build user object manually
        // login(user); // Update auth context
        signup({
          userId: data.userId,
          name: data.name,
        });
        // ✅ Redirect to home page
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleSignup} className="p-4 bg-light rounded shadow-sm">
            <h1 className="text-center mb-4">Sign Up</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <Form.Group controlId="name" className="mb-3">
              <Form.Label className="visually-hidden">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="visually-hidden">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
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

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label className="visually-hidden">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid mb-3">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>

            <p className="text-center mt-3">
              Already have an account?{' '}
              <a href="/login" className="text-primary text-decoration-underline">
                Log In
              </a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
