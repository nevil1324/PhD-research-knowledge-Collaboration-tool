import React from 'react';
import {Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  if (sessionStorage.getItem('userLoggedIn') == null) {
    return <Navigate to="/" replace />;
  }

  return (<div>
    <main>{children}</main>
  </div>);
};

export default ProtectedRoute;
