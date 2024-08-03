import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUser, SetToken } from 'store/Auth';

const fetchUserInfo = async (token: string) => {
  const response = await fetch('https://i11b101.p.ssafy.io/api/accounts/users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

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
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token'); // 토큰을 URL에서 추출

    if (token) {
      // 토큰을 Redux에 저장
      dispatch(SetToken(token));

      // 사용자 정보 조회
      fetchUserInfo(token)
        .then((user) => {
          dispatch(
            SetUser({
              ...user,
              //   birthDate: new Date(user.birthDate), // birthDate를 Date 객체로 변환
              //   questReceptionTime: new Date(user.questReceptionTime), // questReceptionTime을 Date 객체로 변환
            }),
          );
          navigate('/earth');
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
