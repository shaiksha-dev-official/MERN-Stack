import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAuthenticated, role, allowedRoles, ...rest }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="*" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
