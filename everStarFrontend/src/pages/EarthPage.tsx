import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EarthMain } from 'components/templates/EarthMain';
import { LetterBoxTemplate } from 'components/templates/LetterBoxTemplate';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import {
  LetterColor,
  LetterState,
} from 'components/molecules/cards/LetterCard/LetterCard';
import { LetterDetailTemplate } from 'components/templates/LetterDetailTemplate';
import { LetterWriteTemplate } from 'components/templates/LetterWriteTemplate';
import { QuestRouter } from 'components/templates/QuestRouter';
import { QuestOpenviduTemplate } from 'components/templates/QuestOpenviduTemplate';
import { OpenViduApp } from 'components/templates/OpenViduApp';

import bgImage from 'assets/images/bg-earth.webp';
import { RootState } from 'store/Store';
import { useSelector } from 'react-redux';
import { useFetchOtherPetDetails } from 'hooks/useEverStar';

interface PetProfile {
  name: string;
  age: number;
  description: string;
  date: string;
  tagList: string[];
  avatarUrl: string;
  questIndex: number;
}

export const EarthPage: React.FC = () => {
  const PetId = useSelector((state: RootState) => state.pet.petDetails?.id);

  const {
    data: petDetails,
    isLoading: isPetDetailsLoading,
    error: petDetailsError,
  } = useFetchOtherPetDetails(PetId ?? -1);

  if (PetId === undefined) {
    return <div>No Pet ID</div>;
  }

  if (isPetDetailsLoading) {
    return <div>Loading...</div>;
  }

  if (petDetailsError || !petDetails) {
    return <div>No pet details available.</div>;
  }

  const petProfile: PetProfile = {
    name: petDetails.name,
    age: petDetails.age,
    description: petDetails.introduction,
    date: petDetails.memorialDate,
    tagList: petDetails.petPersonalities,
    avatarUrl: petDetails.profileImageUrl,
    questIndex: petDetails.questIndex,
  };

  const generateLargeLetterData = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      type: 'default' as const,
      color: (index % 2 === 0 ? 'white' : 'bgorange') as LetterColor,
      state: (index % 2 === 0 ? 'notReceived' : 'received') as LetterState,
      name: `Sender ${index + 1}`,
      sendMessage: `Message content ${index + 1}`,
      dateTime: `2024-08-${(index % 31) + 1}`,
    }));
  };
  return (
    <div
      className='relative flex flex-col w-full min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header type='earth' className='top-0 z-50' />
      <div className='flex flex-col flex-grow'>
        <div className='flex items-center justify-center flex-grow h-full'>
          <Routes>
            <Route
              path='/'
              element={
                <EarthMain
                  title={petDetails.name}
                  fill={petProfile.questIndex}
                  buttonSize='large'
                  buttonDisabled={false}
                  buttonText='영원별로 이동'
                  buttonIcon='SmallStarImg'
                  onButtonClick={() => console.log('영원별 이동')}
                />
              }
            />
            <Route
              path='letterbox'
              element={
                <LetterBoxTemplate
                  letterData={generateLargeLetterData(50)}
                  currentPage={1}
                  totalPages={9}
                  onPageChange={() => console.log('이동1')}
                  headerText='편지함'
                />
              }
            />
            <Route path='letter' element={<LetterWriteTemplate />} />
            <Route path='letter/:id' element={<LetterDetailTemplate />} />
            <Route path='quest/:questid' element={<QuestRouter />} />
            <Route
              path='openvidu/:questid'
              element={<QuestOpenviduTemplate />}
            />
            <Route path='openvidu/sessionid' element={<OpenViduApp />} />
            <Route
              path='openvidu/sessionid/:sessionId'
              element={<OpenViduApp />}
            />
          </Routes>
        </div>
        <Footer className='w-full mt-auto' />
      </div>
    </div>
  );
};
