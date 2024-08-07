import { useSelector } from 'react-redux';
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import {
  fetchCheeringPet,
  fetchOtherPetDetails,
  fetchCheeringPetDelete,
  fetchPetExplore,
  Cheering,
  fetchPetPost,
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
  // const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const params = useParams();
  console.log(params.pet);
  return useQuery({
    queryKey: ['CheerPet', params.pet],
    queryFn: async () => {
      if (!params.pet || !token) {
        throw new Error('Missing petId or token');
      }
      const cheer = await fetchCheeringPet(Number(params.pet), token);
      console.log(cheer);
      return cheer;
    },
    enabled: !!token && params.pet !== null,
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
      sessionStorage.setItem('diffPetDetails', JSON.stringify(explore.data));
      console.log(explore);
      return explore;
    },
    enabled: false,
  });
};

export const useFetchPetPost = (
  token: string,
  petId: number,
  paramsId: number,
  options?: UseMutationOptions<Cheering, Error, FormData>
) => {
  const queryClient = useQueryClient();

  return useMutation<Cheering, Error, FormData>({
    mutationFn: (formData: FormData) => {
      console.log('Adding pet with formData:', formData);
      return fetchPetPost(formData, token, petId, paramsId);
    },
    ...options,
    onSuccess: () => {
      console.log('Successfully added pet:');
      queryClient.invalidateQueries({ queryKey: ['CheerPet'] });
    },
    onError: (error: Error) => {
      console.error('Error adding pet:', error);
    },
  });
};
