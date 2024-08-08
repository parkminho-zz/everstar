import { useSelector } from 'react-redux';
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { RootState } from 'store/Store';
import {
  fetchLetterPet,
  fetchLetterPetDetail,
  fetchLetterPost,
  Letter,
} from 'api/earthApi';

export const useFetchLetterPost = (
  token: string,
  petId: number,
  options?: UseMutationOptions<
    Letter,
    Error,
    { content: string; image: string }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<Letter, Error, { content: string; image: string }>({
    mutationFn: (data) => {
      return fetchLetterPost(data, token, petId);
    },
    ...options,
    onSuccess: (data) => {
      console.log('Successfully post pet:', data);
      queryClient.invalidateQueries({ queryKey: ['Letter', petId] });
    },
    onError: (error) => {
      console.error('Error adding pet:', error);
    },
  });
};

export const useFetchLetterPet = () => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['LetterPet', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      const letter = await fetchLetterPet(Number(petId), token);
      return letter;
    },
    enabled: !!token && petId !== null,
  });
};

export const useFetchLetterPetDetail = () => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const letterId = useSelector(
    (state: RootState) => state.pet.petDetails?.userId
  );

  return useQuery({
    queryKey: ['LetterPet', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      const letter = await fetchLetterPetDetail(
        Number(petId),
        token,
        Number(letterId)
      );
      return letter;
    },
    enabled: !!token && petId !== null,
  });
};
