// src/components/organics/Login/Login.tsx

import React from 'react';
import { LoginContainer } from 'components/organics/Login/LoginContainer';
import bgImage from 'assets/images/bg-login.webp';
import { useAuthStatus } from 'hooks/useAuth';

export const Login: React.FC = () => {
  useAuthStatus(); // Custom hook to handle authentication and redirection

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
