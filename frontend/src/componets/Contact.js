import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "../css/Contact.css";
import image from '../assets/contact.jpg'; // ✅ Make sure the image exists here

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    problem: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/submit-form", formData);
      alert('Form submitted successfully!');
      setFormData({ name: '', email: '', mobile: '', problem: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="form-container">
              <h2 className="text-center mb-4">Contact Us</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formMobile" className="mb-3">
                  <Form.Label>Mobile Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formProblem" className="mb-4">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder="Write your message"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="submit-button w-100">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
