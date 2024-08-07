// src/hooks/usePets.ts
import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { fetchPets, fetchPetDetails, addPet, Pet, PetInfo } from 'api/petApi';
import {
  setPets,
  addPet as addPetAction,
  setPetDetails,
} from 'store/slices/petSlice';

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
  const queryClient = useQueryClient();

  return useMutation<Pet, Error, FormData>({
    mutationFn: (formData: FormData) => {
      console.log('Adding pet with formData:', formData);
      return addPet(formData, token);
    },
    ...options,
    onSuccess: (data: Pet, variables: FormData, context: unknown) => {
      console.log('Successfully added pet:', data);
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

export const useFetchPetDetails = (petId: number | null, token: string) => {
  const dispatch = useDispatch();
  return useQuery<PetInfo, Error>({
    queryKey: ['petDetails', petId],
    queryFn: async () => {
      console.log('Fetching pet details inside useFetchPetDetails');
      if (petId === null) throw new Error('Pet ID is null');
      const details = await fetchPetDetails(petId, token);
      dispatch(setPetDetails(details));
      return details;
    },
    enabled: !!token && petId !== null,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
