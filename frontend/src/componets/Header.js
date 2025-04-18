import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { PersonCircle } from 'react-bootstrap-icons';
import '../css/Header.css';
import Logo from '../assets/Johi1.png';

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMouseEnter = (link) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);
  const handleNavLinkClick = () => setExpanded(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="tinker-header" fixed="top" expanded={expanded} onToggle={setExpanded}>
      <Container fluid className="px-4">
        
        {/* Left: Logo */}
        <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick} className="d-flex align-items-center">
          <img src={Logo} alt="Logo" className="tinker-logo me-2" />
          <span className="tinker-brand">Cyber C</span>
        </Navbar.Brand>

        {/* Hamburger toggle */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Collapsible content */}
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
          
          {/* Center: Nav Links */}
          <Nav className="mx-auto tinker-nav-links text-center">
            <Nav.Link
              as={Link}
              to="/codeanalyzer"
              onClick={handleNavLinkClick}
              onMouseEnter={() => handleMouseEnter('codeanalyzer')}
              onMouseLeave={handleMouseLeave}
              className={hoveredLink === 'codeanalyzer' ? 'hovered-link' : ''}
            >
              CodeAnalyzer
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              onClick={handleNavLinkClick}
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
              className={hoveredLink === 'about' ? 'hovered-link' : ''}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              onClick={handleNavLinkClick}
              onMouseEnter={() => handleMouseEnter('contact')}
              onMouseLeave={handleMouseLeave}
              className={hoveredLink === 'contact' ? 'hovered-link' : ''}
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* Right:  + Auth */}
          <div className="d-flex align-items-center justify-content-end mt-2 mt-lg-0">
            
          {user ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-user" className="border-0">
                <PersonCircle size={24} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Button variant="outline-light" className="me-2" as={Link} to="/login">Log In</Button>
              <Button variant="light" as={Link} to="/signup">Sign Up</Button>
            </>
          )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
