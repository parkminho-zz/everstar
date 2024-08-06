// src/api/authApi.ts
import config from 'config';

export interface SendCodeResponse {
  success: boolean;
  message: string;
}

export interface VerifyCodeResponse {
  success: boolean;
  message: string;
}

export interface UserInfo {
  email: string;
  userName: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  questReceptionTime: string;
}

const apiUrl = config.API_BASE_URL;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'An error occurred');
  }
  return response;
};

export const sendVerificationCode = async (
  phone: string,
): Promise<SendCodeResponse> => {
  const response = await fetch(`${apiUrl}/api/auth/users/send-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ phone }),
  });

  return handleResponse(response).then((res) => res.json());
};

export const verifyAuthCode = async ({
  phone,
  certificationNumber,
}: {
  phone: string;
  certificationNumber: string;
}): Promise<VerifyCodeResponse> => {
  const response = await fetch(`${apiUrl}/api/auth/users/check-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ phone, certificationNumber }),
  });

  return handleResponse(response).then((res) => res.json());
};

export const joinUser = async (
  userData: UserInfo,
): Promise<{ data: UserInfo; token: string | null }> => {
  const response = await fetch(`${apiUrl}/api/auth/oauth/join`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(userData),
  });

  const data = await handleResponse(response).then((res) => res.json());
  const token = response.headers.get('Authorization')?.split(' ')[1] || null;

  return { data, token };
};

export const fetchUserInfo = async (token: string): Promise<UserInfo> => {
  console.log(`Fetching user info with token: ${token}`);
  const response = await fetch(`${apiUrl}/api/accounts/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('사용자 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();
  console.log('Fetched user info:', result);
  return result.data;
};
