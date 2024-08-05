// src/hooks/usePets.ts
import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchPets, addPet, Pet } from 'api/petApi';
import { setPets, addPet as addPetAction } from 'store/slices/petSlice';

export const useFetchPets = (token: string) => {
  const dispatch = useDispatch();
  return useQuery<Pet[], Error>({
    queryKey: ['pets'],
    queryFn: async () => {
      console.log('Fetching pets inside useFetchPets');
      const pets = await fetchPets(token);
      console.log('Fetched pets in hook:', pets);
      dispatch(setPets(pets));
      return pets;
    },
    enabled: !!token,
  });
};

export const useAddPet = (
  token: string,
  options?: UseMutationOptions<Pet, Error, FormData>,
) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient(); // 리액트 쿼리 클라이언트 가져오기

  return useMutation<Pet, Error, FormData>({
    mutationFn: (formData: FormData) => {
      console.log('Adding pet with formData:', formData);
      return addPet(formData, token);
    },
    ...options,
    onSuccess: (data: Pet, variables: FormData, context: unknown) => {
      console.log('Successfully added pet:', data);
      dispatch(addPetAction(data)); // 추가된 반려동물 정보를 Redux 스토어에 저장
      queryClient.invalidateQueries({ queryKey: ['pets'] }); // 'pets' 쿼리 무효화
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: Error) => {
      console.error('Error adding pet:', error);
    },
  });
};
