import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { MyinfoMove } from 'components/templates/MyInfoMove';
import { Profile } from 'components/templates/Profile';
import { MyInfo } from 'components/templates/MyInfo';
import bgImage from 'assets/images/bg-login.webp';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';

export const MyPage: React.FC = () => {
  const petDetails = useSelector((state: RootState) => state.pet.petDetails);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !petDetails) {
      navigate('/mypage/profile');
    }
  }, [accessToken, petDetails, navigate]);

  return (
    <div
      className="relative flex flex-col w-full min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* petDetails가 있는 경우에만 Header 렌더링 */}
      {petDetails && <Header type="mypage" className="top-0 z-50" />}

      <div className="relative z-10 flex-grow w-full my-4">
        <Routes>
          <Route path="/" element={<MyinfoMove />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myinfo" element={<MyInfo />} />
        </Routes>
      </div>

      <Footer className="relative z-10 w-full mt-auto" />
    </div>
  );
};
