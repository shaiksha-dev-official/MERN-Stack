import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../Components/Login.css';
import { jwtDecode } from 'jwt-decode';



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }
    if (password.length < 6) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (valid) {
      try {
        const response = await axios.post('http://localhost:5000/user/login', { email, password });
        console.log(response.data);
        const authData = response.data;
        if (authData.data[0].isAuthenticated) {
          let userData = jwtDecode(authData.data[0].token);
          console.log("userData", userData);
          sessionStorage.setItem('user', JSON.stringify(userData));
          sessionStorage.setItem('token', authData.data[0].token);
          console.log(authData);
          // Show success message with react-toastify
          toast.success('Login successful...', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
          // Delay the navigation to allow the toast to show
          setTimeout(() => {
            if (userData.role === 'Manager') {
              navigate('/manager/home');
            } else {
              navigate('/employee/home');
            }
          }, 3000);
        } else {
          toast.error('Login failed!..', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
        }
      } catch (error) {
        console.log(`An error occurred: ${error}`);
        setLoginError('Login failed. Please check your credentials and try again.');
        toast.error('Login failed!..', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
      }
    }
  };
  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row>
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center bg-purple text-white p-4 rounded">
          <h3>WorkBuddy</h3>
          <p className="mb-5 ml-5 mr-5 text-center">Success at work is a journey, and the first step is managing your tasks effectively</p>
        </Col>
        <Col md={6} className="p-4 shadow">
          <h2 className="mb-3 text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-1" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailError('')}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordError('')}
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Row className="mb-3">
              <Col>
                <Form.Check type="checkbox" label="Remember me" />
              </Col>
              <Col className="text-end">
                <a href="#">Forgot password?</a>
              </Col>
            </Row> */}
            <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#6a1b9a', borderColor: '#6a1b9a' }}>
              LOGIN
            </Button>
          </Form>
          <p className="mt-3">Don't have an account? <Link to='/register'>Sign up</Link></p>
        </Col>
      </Row>
    </Container>
  );
}
export default LoginPage;