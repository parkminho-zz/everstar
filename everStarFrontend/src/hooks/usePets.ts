import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchPets, addPet, Pet, PetFormData } from 'api/petApi';
import { setPets, addPet as addPetAction } from 'store/actions/petActions';

export const useFetchPets = (token: string) => {
  const dispatch = useDispatch();
  return useQuery<Pet[], Error>({
    queryKey: ['pets'],
    queryFn: async () => {
      const pets = await fetchPets(token);
      dispatch(setPets(pets));
      return pets;
    },
    enabled: !!token,
  });
};

export const useAddPet = (token: string, options?: UseMutationOptions<Pet, Error, PetFormData>) => {
  const dispatch = useDispatch();
  return useMutation<Pet, Error, PetFormData>({
    mutationFn: (petData: PetFormData) => addPet(petData, token),
    ...options,
    onSuccess: (data: Pet, variables: PetFormData, context: unknown) => {
      dispatch(addPetAction(data)); // 추가된 반려동물 정보를 Redux 스토어에 저장
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
