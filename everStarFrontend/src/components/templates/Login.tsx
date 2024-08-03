import React from 'react';
import { LoginContainer } from 'components/organics/Login/LoginContainer';
import bgImage from 'assets/images/bg-login.png';

export const Login: React.FC = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <LoginContainer />
      </div>
    </div>
  );
};
