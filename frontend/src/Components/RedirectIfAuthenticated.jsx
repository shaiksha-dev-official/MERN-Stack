import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ element: Component, isAuthenticated, ...rest }) => {
  if (isAuthenticated) {
    return <Navigate to="/employee/home" />; // Redirect to the home page or any other page
  }

  return <Component {...rest} />;
};

export default RedirectIfAuthenticated;
