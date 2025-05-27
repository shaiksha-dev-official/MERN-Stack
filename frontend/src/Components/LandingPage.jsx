import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/LandingPage.css'; 


const LandingPage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" className="text-center mt-5" style={{ overflow: 'hidden' }}>
      <div className="header-buttons">
        <Button variant="contained" color="primary" onClick={handleRegisterClick}>
          Register
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLoginClick}>
          Login
        </Button>
      </div>
      <Box className="landing-page-content">
        <Box className="content">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to 
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
          Empowering Employee-Manager Collaboration
          </Typography>
        </Box>
        <Box className="background-image">
          <img src='https://img.freepik.com/premium-vector/programmer-engineering-development-coding-web-development-website-design-developer-vector_199064-126.jpg' alt="Background" className="background-img" />
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
