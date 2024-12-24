import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
  const handleLogin = (userCredentials) => {
    // Handle login (send to backend, store token, etc.)
    console.log(userCredentials);
  };

  return (
    <div>
      <h1>Login</h1>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
