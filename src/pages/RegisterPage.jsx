import React from 'react';
import Register from '../components/Register';

const RegisterPage = () => {
  const handleRegister = (userCredentials) => {
    // Handle register (send to backend, store token, etc.)
    console.log(userCredentials);
  };

  return (
    <div>
      <h1>Register</h1>
      <Register onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
