import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store/Store';
import { useFetchPets, useFetchPetDetails } from 'hooks/usePets';
import { useFetchUserInfo } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  setPets,
  setSelectedPetId,
  setPetDetails,
} from 'store/slices/petSlice';
import { setUser } from 'store/slices/authSlice';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { Tab } from 'components/molecules/Tab/Tab';
import { UserInfoTab } from 'components/organics/Profile/UserInfoTab';
import { PetInfoTab } from 'components/organics/Profile/PetInfoTab';
import { Glass } from 'components/molecules/Glass/Glass';

export const MyInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const pets = useSelector((state: RootState) => state.pet.pets);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const selectedPetId = useSelector(
    (state: RootState) => state.pet.selectedPetId
  );
  const [activeTab, setActiveTab] = useState<'one' | 'two'>('one');
  const [initialPetId] = useState<number | null>(selectedPetId);

  const {
    data: petsData,
    isLoading: isPetsLoading,
    error: petsError,
  } = useFetchPets(token);
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useFetchUserInfo(token);

  const {
    mutate: fetchPetDetails,
    data: petDetailsData,
    error: petDetailsError,
  } = useFetchPetDetails(selectedPetId ?? 0, token);

  useEffect(() => {
    if (petsData) {
      dispatch(setPets(petsData));
    }
  }, [petsData, dispatch]);

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (selectedPetId !== null) {
      fetchPetDetails();
    }
  }, [selectedPetId, fetchPetDetails]);

  useEffect(() => {
    if (selectedPetId !== null && petDetailsData) {
      console.log('Fetched pet details:', petDetailsData);
      console.log('Personalities:', petDetailsData.personalities);
      dispatch(setPetDetails(petDetailsData));
    }
  }, [selectedPetId, petDetailsData, dispatch]);

  useEffect(() => {
    // Cleanup function to reset the selectedPetId to the initialPetId on unmount
    return () => {
      dispatch(setSelectedPetId(initialPetId));
    };
  }, [dispatch, initialPetId]);

  const getGenderText = useCallback((gender: string) => {
    switch (gender) {
      case 'MALE':
        return '남성';
      case 'FEMALE':
        return '여성';
      default:
        return 'unknown';
    }
  }, []);

  const petOptions = useMemo(() => pets.map((pet) => pet.name), [pets]);

  const petInfo = useMemo(() => {
    if (!petDetailsData) return {};
    return {
      [petDetailsData.name]: {
        id: petDetailsData.id,
        userId: petDetailsData.userId,
        name: petDetailsData.name,
        age: petDetailsData.age,
        memorialDate: petDetailsData.memorialDate || 'unknown',
        gender: getGenderText(petDetailsData.gender) || 'unknown',
        species: petDetailsData.species || 'unknown',
        relationship: petDetailsData.relationship,
        personalities: petDetailsData.personalities || [],
        profileImageUrl: petDetailsData.profileImageUrl,
      },
    };
  }, [petDetailsData, getGenderText]);

  const onPetSelect = useCallback(
    (name: string) => {
      const selectedPet = pets.find((pet) => pet.name === name);
      if (selectedPet && selectedPet.id !== selectedPetId) {
        dispatch(setSelectedPetId(selectedPet.id));
        fetchPetDetails();
        setActiveTab('two'); // 반려동물을 선택하면 탭을 전환
      }
    },
    [dispatch, pets, selectedPetId, fetchPetDetails]
  );

  if (isPetsLoading || isUserLoading) return <div>로딩 중...</div>;
  if (petsError) return <div className='text-red-500'>{petsError.message}</div>;
  if (userError) return <div className='text-red-500'>{userError.message}</div>;
  if (petDetailsError)
    return <div className='text-red-500'>{petDetailsError.message}</div>;
  if (!userInfo) return <div>사용자 정보를 불러오는 중...</div>;

  const handleButtonClick = () => {
    console.log('Primary Button Clicked');
  };

  return (
    <div className='relative flex flex-col items-center justify-center w-full min-h-screen'>
      <Glass
        currentPage={1}
        totalPages={1}
        onPageChange={(newPage) => console.log('Page changed to:', newPage)}
        showPageIndicator={false}
        className='absolute top-0 bottom-0 left-0 right-0 z-0'
      />
      <div className='relative z-10 flex flex-col items-center justify-center w-full h-full'>
        <div className='flex justify-center p-6'>
          <div className='flex flex-col items-center w-[360px] gap-8 p-5 bg-white rounded-lg shadow-md'>
            <ModalHeader
              text='마이 페이지'
              showLeftIcon={true}
              onLeftIconClick={() => navigate(-1)}
            />
            <Tab
              row='two'
              activeTab={activeTab}
              className='mb-4'
              onTabClick={(tab) => setActiveTab(tab as 'one' | 'two')}
            />
            {activeTab === 'one' ? (
              <UserInfoTab
                userInfo={{
                  name: userInfo?.userName || '',
                  birthdate: userInfo?.birthDate || '',
                  gender: getGenderText(userInfo?.gender || ''),
                  email: userInfo?.email || '',
                  phone: userInfo?.phoneNumber || '',
                }}
                smallButtonText='핸드폰 번호 수정하기'
                onButtonClick={handleButtonClick}
              />
            ) : (
              <PetInfoTab
                petOptions={petOptions}
                petInfo={petInfo}
                onPetSelect={onPetSelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
