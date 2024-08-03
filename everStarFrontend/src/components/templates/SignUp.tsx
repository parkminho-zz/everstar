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

const sendVerificationCode = async (phoneNumber: string): Promise<SendCodeResponse> => {
  const response = await fetch('https://i11b101.p.ssafy.io/api/auth/users/send-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    if (response.status === 400) {
      alert('잘못된 전화번호입니다. 다시 확인해주세요.');
    } else {
      throw new Error(errorResponse.message || 'Failed to send verification code');
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
  const response = await fetch('https://i11b101.p.ssafy.io/api/auth/users/check-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone, certificationNumber }),
  });

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
  const response = await fetch('https://i11b101.p.ssafy.io/api/auth/oauth/join', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to join user');
  }

  return response.json();
};

export const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const footerType = isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop';

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

    if (process.env.NODE_ENV === 'development') {
      // 개발 환경에서는 휴대폰 인증 생략
      handleJoinUser({
        ...formData,
        phoneNumber,
      });
    } else {
      setModalOpen(true);
    }
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
    onError: (error: Error) => {
      console.error('Error sending verification code:', error.message);
      if (error.message.includes('400')) {
        alert('잘못된 전화번호입니다. 다시 확인해주세요.');
      } else {
        navigate('/login');
      }
    },
  });

  const handleJoinUser = (userInfo: UserInfo) => {
    console.log('회원가입 데이터:', userInfo); // 회원가입 데이터 출력
    mutateJoinUser(userInfo);
  };

  const { mutate: mutateVerifyCode } = useMutation(verifyAuthCode, {
    onSuccess: () => {
      console.log('Auth code verified successfully');
      handleJoinUser(formData);
    },
    onError: (error: Error) => {
      console.error('Error verifying auth code:', error.message);
      if (error.message.includes('400')) {
        alert('잘못된 인증번호입니다. 다시 확인해주세요.');
      } else {
        navigate('/login');
      }
    },
  });

  const { mutate: mutateJoinUser } = useMutation(joinUser, {
    onSuccess: (data) => {
      console.log('User joined successfully');
      dispatch(SetToken(data.token)); // 토큰 저장
      dispatch(SetUser(data.user));
      navigate('/earth');
    },
    onError: (error: Error) => {
      console.error('Error joining user:', error.message);
      navigate('/login');
    },
  });

  const handleVerify = (certificationNumber: string) => {
    mutateVerifyCode({ phone, certificationNumber });
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex items-center justify-center flex-grow">
        <SignUpForm
          headerText="회원가입"
          smallButtonText="" // 절대 채우면 안됨
          showPrimaryButton={true}
          text="회원가입을 위해 정보를 입력해주세요."
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
            if (process.env.NODE_ENV !== 'development') {
              mutateSendCode(phoneNumber);
            }
          }}
        />
        {process.env.NODE_ENV !== 'development' && (
          <PhoneNumberModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onResend={handleResend}
            onVerify={handleVerify}
            text="인증번호를 <br /> 입력해 주세요"
          />
        )}
      </div>
      <Footer type={footerType} className="mt-auto" /> {/* 푸터 */}
    </div>
  );
};
