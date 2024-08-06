import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from 'store/slices/authSlice'; // 경로 확인

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
    const pathSegments = location.pathname.split('/');
    const token = pathSegments[pathSegments.length - 1];

    if (token) {
      console.log('Extracted token:', token);
      dispatch(setToken(token));

      fetchUserInfo(token)
        .then((user) => {
          console.log('Fetched user info:', user);
          dispatch(setUser(user));
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
