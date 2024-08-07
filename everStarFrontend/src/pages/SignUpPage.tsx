import React from 'react';
import { SignUp as SignUpTemplate } from 'components/templates/SignUp';
import { Footer } from 'components/molecules/Footer/Footer';
import bgImage from 'assets/images/bg-login.webp';

export const SignUpPage: React.FC = () => {
  return (
    <div
      className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <SignUpTemplate />
      <Footer className='mt-auto' />
    </div>
  );
};
