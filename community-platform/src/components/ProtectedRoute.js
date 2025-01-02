import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? children : <LoginModal showModal={!user} />}
    </>
  );
};

export default ProtectedRoute;
