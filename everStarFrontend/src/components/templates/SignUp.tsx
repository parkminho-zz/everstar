import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Footer } from 'components/molecules/Footer/Footer';
import { SignUpForm } from 'components/organics/SignUpForm/SignUpForm';
import { PhoneNumberModal } from 'components/organics/PhoneNumberModal/PhoneNumberModal';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgImage from 'assets/images/bg-login.png';
import { SetUser, SetToken } from 'store/Auth';

interface SendCodeResponse {
  success: boolean;
  message: string;
}

interface VerifyCodeResponse {
  success: boolean;
  message: string;
}

interface JoinResponse {
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

interface UserInfo {
  email: string;
  userName: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  questReceptionTime: string;
}

const sendVerificationCode = async (
  phone: string,
): Promise<SendCodeResponse> => {
  const response = await fetch(
    'https://i11b101.p.ssafy.io/api/auth/users/send-code',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    if (response.status === 400) {
      alert('잘못된 전화번호입니다. 다시 확인해주세요.');
    } else {
      throw new Error(
        errorResponse.message || 'Failed to send verification code',
      );
    }
  }

  return response.json();
};

const verifyAuthCode = async ({
  phone,
  certificationNumber,
}: {
  phone: string;
  certificationNumber: string;
}): Promise<VerifyCodeResponse> => {
  const response = await fetch(
    'https://i11b101.p.ssafy.io/api/auth/users/check-code',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, certificationNumber }),
    },
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

const joinUser = async (userData: UserInfo): Promise<JoinResponse> => {
  console.log('전송 데이터:', userData); // 전송하는 데이터 출력
  const response = await fetch(
    'https://i11b101.p.ssafy.io/api/auth/oauth/join',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error('회원가입 실패:', errorResponse); // 오류 메시지 출력
    throw new Error(errorResponse.message || 'Failed to join user');
  }

  return response.json();
};

export const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const footerType = isMobile
    ? 'mobile'
    : isTabletOrMobile
      ? 'tablet'
      : 'desktop';

  const [isModalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [formData, setFormData] = useState<UserInfo>({
    email: '',
    userName: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    questReceptionTime: '',
  });

  const handleSignUpButtonClick = (
    phoneNumber: string,
    email: string,
    userName: string,
    birthDate: string,
    gender: string,
    questReceptionTime: string,
  ) => {
    setPhone(phoneNumber);
    setFormData({
      email,
      userName,
      phoneNumber,
      birthDate,
      gender,
      questReceptionTime,
    });

    setModalOpen(true); // 모달 열기
    mutateSendCode(phoneNumber); // 인증 코드 전송
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleResend = () => {
    console.log('Resend Verification Code');
    mutateSendCode(formData.phoneNumber);
  };

  const { mutate: mutateSendCode } = useMutation(sendVerificationCode, {
    onSuccess: () => {
      console.log('Verification code sent successfully');
    },
    onError: (error: unknown) => {
      const err = error as Error;
      console.error('Error sending verification code:', err.message);
      if (err.message.includes('400')) {
        alert('잘못된 전화번호입니다. 다시 확인해주세요.');
      } else {
        navigate('/login');
      }
    },
  });

  const handleVerifyAndJoin = (certificationNumber: string) => {
    mutateVerifyCode(
      { phone, certificationNumber },
      {
        onSuccess: () => {
          console.log('Auth code verified successfully');
          // 인증이 성공하면 회원가입 진행
          mutateJoinUser(formData);
        },
        onError: (error: unknown) => {
          const err = error as Error;
          console.error('Error verifying auth code:', err.message);
          if (err.message.includes('400')) {
            alert('잘못된 인증번호입니다. 다시 확인해주세요.');
          } else {
            navigate('/login');
          }
        },
      },
    );
  };

  const { mutate: mutateJoinUser } = useMutation(joinUser, {
    onSuccess: (data) => {
      console.log('User joined successfully', data); // 성공 로그 추가
      dispatch(SetToken(data.token)); // 토큰 저장
      dispatch(SetUser(data.user));
      console.log('Token and user set in Redux:', data.token, data.user); // 디스패치 후 로그
      navigate('/profile');
    },
    onError: (error: unknown) => {
      const err = error as Error;
      console.error('Error joining user:', err.message);
      navigate('/login');
    },
  });

  const { mutate: mutateVerifyCode } = useMutation(verifyAuthCode);

  return (
    <div
      className='flex flex-col min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='flex items-center justify-center flex-grow'>
        <SignUpForm
          headerText='회원가입'
          smallButtonText='' // 절대 채우면 안됨
          showPrimaryButton={true}
          text='회원가입을 위해 정보를 입력해주세요.'
          onButtonClick={(
            phoneNumber: string,
            email: string,
            userName: string,
            birthDate: string,
            gender: string,
            questReceptionTime: string,
          ) => {
            handleSignUpButtonClick(
              phoneNumber,
              email,
              userName,
              birthDate,
              gender,
              questReceptionTime,
            );
          }}
        />
        <PhoneNumberModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onResend={handleResend}
          onVerify={handleVerifyAndJoin}
          text='인증번호를 <br /> 입력해 주세요'
        />
      </div>
      <Footer type={footerType} className='mt-auto' /> {/* 푸터 */}
    </div>
  );
};
