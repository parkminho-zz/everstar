import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Footer } from 'components/molecules/Footer/Footer';
import { SignUpForm } from 'components/organics/SignUpForm/SignUpForm';
import { PhoneNumberModal } from 'components/organics/PhoneNumberModal/PhoneNumberModal';
import { useSendVerificationCode, useVerifyAuthCode, useJoinUser } from 'hooks/useAuth';
import bgImage from 'assets/images/bg-login.webp';

interface UserInfo {
  email: string;
  userName: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  questReceptionTime: string;
}

export const SignUp: React.FC = () => {
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

  const { mutate: mutateSendCode } = useSendVerificationCode();
  const { mutate: mutateVerifyCode } = useVerifyAuthCode();
  const { mutate: mutateJoinUser } = useJoinUser();

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
    mutateSendCode(phoneNumber, {
      onError: (error: unknown) => {
        const err = error as Error;
        console.error('Error sending verification code:', err.message);
        if (err.message.includes('400')) {
          alert('잘못된 전화번호입니다. 다시 확인해주세요.');
        } else {
          // navigate('/login');
        }
      },
    }); // 인증 코드 전송
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleResend = () => {
    console.log('Resend Verification Code');
    mutateSendCode(formData.phoneNumber, {
      onError: (error: unknown) => {
        const err = error as Error;
        console.error('Error resending verification code:', err.message);
        if (err.message.includes('400')) {
          alert('잘못된 전화번호입니다. 다시 확인해주세요.');
        } else {
          // navigate('/login');
        }
      },
    });
  };

  const handleVerifyAndJoin = (certificationNumber: string) => {
    mutateVerifyCode(
      { phone, certificationNumber },
      {
        onSuccess: () => {
          console.log('Auth code verified successfully');
          // 인증이 성공하면 회원가입 진행
          mutateJoinUser(formData, {
            onError: (error: unknown) => {
              const err = error as Error;
              console.error('Error joining user:', err.message);
              // navigate('/login');
            },
          });
        },
        onError: (error: unknown) => {
          const err = error as Error;
          console.error('Error verifying auth code:', err.message);
          if (err.message.includes('400')) {
            alert('잘못된 인증번호입니다. 다시 확인해주세요.');
          } else {
            // navigate('/login');
          }
        },
      },
    );
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
          }}
        />
        <PhoneNumberModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onResend={handleResend}
          onVerify={handleVerifyAndJoin}
          text="인증번호를 <br /> 입력해 주세요"
        />
      </div>
      <Footer type={footerType} className="mt-auto" /> {/* 푸터 */}
    </div>
  );
};
