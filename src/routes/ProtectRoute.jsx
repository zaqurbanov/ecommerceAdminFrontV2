import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isActiveUser = useSelector(state => state.user.isActiveUser);

  if (!isActiveUser) {
    return  isActiveUser ? <Outlet /> : <Navigate to="/login" />;;
  }

  return children;
};

export default ProtectedRoute;
