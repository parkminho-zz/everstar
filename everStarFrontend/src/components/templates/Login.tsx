import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/Store';
import { LoginContainer } from 'components/organics/Login/LoginContainer';
import bgImage from 'assets/images/bg-login.png';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    console.log('Access Token:', accessToken); // 콘솔에 토큰 출력
    if (accessToken) {
      navigate('/profile');
    }
  }, [accessToken, navigate]);

  return (
    <div
      className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='relative z-10 flex items-center justify-center w-full h-full'>
        <LoginContainer />
      </div>
    </div>
  );
};
