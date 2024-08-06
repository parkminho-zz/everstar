// src/components/templates/MyInfo.tsx
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store/Store';
import { useFetchPets, useFetchPetDetails } from 'hooks/usePets';
import { useFetchUserInfo } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import {
  setPets,
  setPetDetails,
  setSelectedPetId,
} from 'store/slices/petSlice';
import { setUser } from 'store/slices/authSlice';
import {
  UserProfile,
  UserProfileProps,
} from 'components/organics/Profile/UserProfile';

export const MyInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const pets = useSelector((state: RootState) => state.pet.pets);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const petDetails = useSelector((state: RootState) => state.pet.petDetails);
  const selectedPetId = useSelector(
    (state: RootState) => state.pet.selectedPetId,
  );

  const [initialLoad, setInitialLoad] = useState(true);

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
    data: petDetailsData,
    isLoading: isPetDetailsLoading,
    error: petDetailsError,
  } = useFetchPetDetails(selectedPetId !== -1 ? selectedPetId : null, token);

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
    if (initialLoad && pets.length > 0) {
      dispatch(setSelectedPetId(pets[0].id));
      setInitialLoad(false);
    }
  }, [initialLoad, pets, dispatch]);

  useEffect(() => {
    if (selectedPetId !== -1 && petDetailsData) {
      dispatch(setPetDetails(petDetailsData));
    }
  }, [selectedPetId, petDetailsData, dispatch]);

  // 디버그 로그 추가
  console.log('Token:', token);
  console.log('Pets:', pets);
  console.log('User Info:', userInfo);
  console.log('Pet Details:', petDetails);
  console.log('Selected Pet ID:', selectedPetId);

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
    return petDetails
      ? {
          [petDetails.name]: {
            id: petDetails.id,
            userId: petDetails.userId,
            name: petDetails.name,
            age: petDetails.age,
            memorialDate: petDetails.memorialDate || 'unknown',
            gender: getGenderText(petDetails.gender) || 'unknown',
            species: petDetails.species || 'unknown',
            relationship: petDetails.relationship,
            personalities: petDetails.personalities || [],
            profileImageUrl: petDetails.profileImageUrl,
          },
        }
      : {};
  }, [petDetails, getGenderText]);

  const onPetSelect = useCallback(
    (name: string) => {
      const selectedPet = pets.find((pet) => pet.name === name);
      if (selectedPet && selectedPet.id !== selectedPetId) {
        dispatch(setSelectedPetId(selectedPet.id));
      }
    },
    [dispatch, pets, selectedPetId],
  );

  if (isPetsLoading || isUserLoading || isPetDetailsLoading)
    return <div>로딩 중...</div>;
  if (petsError) return <div className='text-red-500'>{petsError.message}</div>;
  if (userError) return <div className='text-red-500'>{userError.message}</div>;
  if (petDetailsError)
    return <div className='text-red-500'>{petDetailsError.message}</div>;
  if (!userInfo) return <div>사용자 정보를 불러오는 중...</div>;

  const userProfileData: UserProfileProps = {
    headerText: '마이 페이지',
    largeButtonText: '저장',
    smallButtonText: '핸드폰 번호 수정하기',
    showPrimaryButton: true,
    userInfo: {
      name: userInfo.userName || '', // userInfo에서 직접 가져오기
      birthdate: userInfo.birthDate || '', // userInfo에서 직접 가져오기
      gender: getGenderText(userInfo.gender || ''), // userInfo에서 직접 가져오기
      email: userInfo.email || '', // userInfo에서 직접 가져오기
      phone: userInfo.phoneNumber || '', // userInfo에서 직접 가져오기
    },
    petOptions: petOptions,
    petInfo: petInfo,
    onPetSelect: onPetSelect,
  };

  return (
    <div className='relative z-10 flex-grow my-4'>
      <UserProfile
        {...userProfileData}
        onLeftIconClick={() => navigate(-1)} // 이전 페이지로 이동하는 핸들러 추가
      />
    </div>
  );
};
