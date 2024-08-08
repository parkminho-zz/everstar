import React from 'react';
import { Login as LoginTemplate } from 'components/templates/Login';
import bgImage from 'assets/images/bg-login.webp';

export const LoginPage: React.FC = () => {
  return (
    <div
      className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <LoginTemplate />
    </div>
  );
};
