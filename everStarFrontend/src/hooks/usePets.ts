import { useQuery, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { fetchPets, fetchPetDetails, addPet, Pet, PetInfo } from 'api/petApi';
import { useDispatch } from 'react-redux';
import { setPets, addPet as addPetAction, setPetDetails } from 'store/slices/petSlice';

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

export const useAddPet = (token: string, options?: UseMutationOptions<Pet, Error, FormData>) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<Pet, Error, FormData>({
    mutationFn: (formData: FormData) => {
      return addPet(formData, token);
    },
    ...options,
    onSuccess: (data: Pet, variables: FormData, context: unknown) => {
      dispatch(addPetAction(data));
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: Error) => {
      console.error('Error adding pet:', error);
    },
  });
};

export const useFetchPetDetails = (petId: number, token: string) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<PetInfo, Error, void>({
    mutationFn: async () => {
      const details = await fetchPetDetails(petId, token);
      dispatch(setPetDetails(details));
      return details;
    },
    onSuccess: (data: PetInfo) => {
      queryClient.invalidateQueries({ queryKey: ['petDetails', data.id] });
    },
    onError: (error: Error) => {
      console.error('Error fetching pet details:', error);
    },
  });
};
