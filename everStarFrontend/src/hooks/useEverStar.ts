import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  fetchCheeringPet,
  fetchOtherPetDetails,
  fetchCheeringPetDelete,
  fetchPetExplore,
} from '../api/everStarApi';
import { RootState } from 'store/Store';

export const useFetchCheeringPetDelete = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useMutation({
    mutationFn: async (params: {
      petId: number;
      cheeringMessageId: number;
    }) => {
      if (!token) {
        throw new Error('토큰이 없습니다');
      }
      return fetchCheeringPetDelete(
        params.petId,
        token,
        params.cheeringMessageId
      );
    },
    onSuccess: () => {
      console.log('응원 메시지 삭제 성공');
    },
    onError: (error: Error) => {
      console.error('응원 메시지 삭제 실패:', error.message);
    },
  });
};

export const useFetchOtherPetDetails = () => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['petDetails', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      console.log('Fetching pet details inside useFetchPetDetails');
      const details = await fetchOtherPetDetails(petId, token);
      sessionStorage.setItem('petDetails', JSON.stringify(details.data));
      return details.data;
    },
    enabled: !!token && petId !== null,
  });
};

export const useFetchCheeringPet = () => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['CheerPet', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      const cheer = await fetchCheeringPet(petId, token);
      console.log(cheer);
      return cheer;
    },
    enabled: !!token && petId !== null,
  });
};

export const useFetchPetExplore = () => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['ExplorePet', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }

      const explore = await fetchPetExplore(petId, token);
      sessionStorage.setItem('petDetails', JSON.stringify(explore.data));
      console.log(explore);
      return explore;
    },
    enabled: !!token && petId !== null,
  });
};
