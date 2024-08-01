import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { Glass } from 'components/molecules/Glass/Glass';
import bgImage from 'assets/images/bg-login.png';
import { UserProfile, UserProfileProps } from 'components/organics/Profile/UserProfile';

// JSON 데이터 (예시)
const petInfo = {
  뚜뚜: {
    name: '뚜뚜',
    birthdate: '2017-01-01',
    gender: '여성',
    breed: '푸들',
    color: '갈색',
    personality: ['사랑스러움', '활발함', '애교쟁이'],
  },
  타이틀1: {
    name: '타이틀1',
    birthdate: '2018-02-02',
    gender: '남성',
    breed: '시바견',
    color: '검정색',
    personality: ['용맹함', '충성심', '경계심'],
  },
  타이틀2: {
    name: '타이틀2',
    birthdate: '2019-03-03',
    gender: '여성',
    breed: '골든 리트리버',
    color: '노란색',
    personality: ['친절함', '지혜로움', '활동적'],
    avatarSrc: 'https://via.placeholder.com/120', // 추가된 부분
  },
  타이틀3: {
    name: '타이틀3',
    birthdate: '2020-04-04',
    gender: '남성',
    breed: '코카 스패니얼',
    color: '흰색',
    personality: ['상냥함', '조용함', '온순함'],
  },
};

const userProfileData: UserProfileProps = {
  headerText: '마이 페이지',
  largeButtonText: 'Save',
  smallButtonText: '핸드폰 번호 수정하기',
  showPrimaryButton: true,
  userInfo: {
    name: '김철수',
    birthdate: '1990-01-01',
    gender: '남성',
    email: 'example@example.com',
    phone: '010-1234-5678',
  },
  petOptions: Object.keys(petInfo),
  petInfo: petInfo,
};

export const MyInfo: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const headerType = isMobile
    ? 'mobile-everstar'
    : isTabletOrMobile
      ? 'tablet-everstar'
      : 'everstar';

  const footerType = isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop';

  return (
    <div
      className="relative flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header type={headerType} className="sticky top-0 z-50" />
      <Glass
        variant={isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop'}
        currentPage={1}
        totalPages={1}
        onPageChange={(newPage) => console.log('Page changed to:', newPage)}
        showPageIndicator={false}
      />
      <div className="relative z-10 my-4">
        <UserProfile {...userProfileData} />
      </div>
      <Footer type={footerType} className="relative z-10 mt-auto" />
    </div>
  );
};
