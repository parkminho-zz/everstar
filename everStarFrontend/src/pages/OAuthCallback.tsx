import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUser, SetToken } from 'store/Auth';

const fetchUserInfo = async (token: string) => {
  const response = await fetch(
    'https://i11b101.p.ssafy.io/api/accounts/users',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
};

export const OAuthCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const token = pathSegments[pathSegments.length - 1]; // 마지막 경로 세그먼트에서 토큰 추출

    if (token) {
      console.log('Extracted token:', token); // 토큰 로그 추가
      // 토큰을 Redux에 저장
      dispatch(SetToken(token));

      // 사용자 정보 조회
      fetchUserInfo(token)
        .then((user) => {
          console.log('Fetched user info:', user); // 사용자 정보 로그 추가
          dispatch(
            SetUser({
              ...user,
              // 필요한 경우 birthDate와 questReceptionTime 변환
              // birthDate: new Date(user.birthDate),
              // questReceptionTime: new Date(user.questReceptionTime),
            }),
          );
          navigate('/profile');
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [location, dispatch, navigate]);

  return <div>Loading...</div>;
};
