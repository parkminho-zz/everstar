import React from 'react';
import { Login as LoginContainer } from 'components/organics/Login/Login';
import bgImage from 'assets/images/bg-login.png';

export const Login: React.FC = () => {
  return (
    <div
      className="relative flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 flex items-center justify-center flex-1 my-4">
        <LoginContainer />
      </div>
    </div>
  );
};
