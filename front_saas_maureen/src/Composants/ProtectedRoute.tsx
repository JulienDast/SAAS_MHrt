import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const sessionCode = sessionStorage.getItem('sessionCode');

  if (!sessionCode) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;