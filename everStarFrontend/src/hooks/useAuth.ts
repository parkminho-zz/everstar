// src/hooks/useAuth.ts

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/Store';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  sendVerificationCode,
  verifyAuthCode,
  joinUser,
  SendCodeResponse,
  VerifyCodeResponse,
  JoinResponse,
  UserInfo,
} from 'api/authApi';
import { setToken, setUser } from 'store/actions/authActions';
import { useDispatch } from 'react-redux';

export const useSendVerificationCode = (): UseMutationResult<
  SendCodeResponse,
  unknown,
  string,
  unknown
> => {
  return useMutation<SendCodeResponse, unknown, string>({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      console.log('Verification code sent successfully');
    },
    onError: (error: unknown) => {
      const err = error as Error;
      console.error('Error sending verification code:', err.message);
    },
  });
};

export const useVerifyAuthCode = (): UseMutationResult<
  VerifyCodeResponse,
  unknown,
  { phone: string; certificationNumber: string },
  unknown
> => {
  return useMutation<VerifyCodeResponse, unknown, { phone: string; certificationNumber: string }>({
    mutationFn: verifyAuthCode,
    onSuccess: () => {
      console.log('Auth code verified successfully');
    },
    onError: (error: unknown) => {
      const err = error as Error;
      console.error('Error verifying auth code:', err.message);
    },
  });
};

export const useJoinUser = (): UseMutationResult<JoinResponse, unknown, UserInfo, unknown> => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<JoinResponse, unknown, UserInfo>({
    mutationFn: joinUser,
    onSuccess: (data: JoinResponse) => {
      console.log('User joined successfully', data); // 성공 로그 추가
      dispatch(setToken(data.token)); // 토큰 저장
      dispatch(setUser(data.user));
      console.log('Token and user set in Redux:', data.token, data.user); // 디스패치 후 로그
      navigate('/profile');
    },
    onError: (error: unknown) => {
      const err = error as Error;
      console.error('Error joining user:', err.message);
      navigate('/login');
    },
  });
};

export const useAuthStatus = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    console.log('Access Token:', accessToken); // 콘솔에 토큰 출력
    if (accessToken) {
      navigate('/profile');
    }
  }, [accessToken, navigate]);
};
