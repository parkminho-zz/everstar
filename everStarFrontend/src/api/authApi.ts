import config from 'config';

export interface SendCodeResponse {
  success: boolean;
  message: string;
}

export interface VerifyCodeResponse {
  success: boolean;
  message: string;
}

export interface JoinResponse {
  token: string;
  user: {
    email: string;
    userName: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
    questReceptionTime: string;
  };
}

export interface UserInfo {
  email: string;
  userName: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  questReceptionTime: string;
}

export const sendVerificationCode = async (
  phone: string
): Promise<SendCodeResponse> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/users/send-code`,
    {
      // 환경 변수 사용
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    if (response.status === 400) {
      alert('잘못된 전화번호입니다. 다시 확인해주세요.');
    } else {
      throw new Error(
        errorResponse.message || 'Failed to send verification code'
      );
    }
  }

  return response.json();
};

export const verifyAuthCode = async ({
  phone,
  certificationNumber,
}: {
  phone: string;
  certificationNumber: string;
}): Promise<VerifyCodeResponse> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/users/check-code`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, certificationNumber }),
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    if (response.status === 400) {
      alert(errorResponse.message);
    } else {
      throw new Error(errorResponse.message || 'Failed to verify auth code');
    }
  }

  return response.json();
};

export const joinUser = async (userData: UserInfo): Promise<JoinResponse> => {
  console.log('전송 데이터:', userData); // 전송하는 데이터 출력
  const response = await fetch(`${config.API_BASE_URL}//api/auth/oauth/join`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error('회원가입 실패:', errorResponse); // 오류 메시지 출력
    throw new Error(errorResponse.message || 'Failed to join user');
  }

  return response.json();
};
