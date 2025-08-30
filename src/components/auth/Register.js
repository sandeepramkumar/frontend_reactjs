import { useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon } from 'react-feather';
import '../../styles/Login.css'; // Reuse login styles

const Register = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="login-container">
      <div className="login-animation">
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="login-card">
          <div className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </div>
          <h2 className="text-center mb-4">Register</h2>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Register;