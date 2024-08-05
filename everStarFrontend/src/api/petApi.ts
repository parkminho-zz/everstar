// src/api/petApi.ts

export interface Pet {
  id: number;
  profileImageUrl: string;
  name: string;
}

export interface PetFormData {
  name: string;
  age: number;
  memorialDate: string | null;
  species: string;
  gender: string;
  relationship: string;
  profileImage: File | null;
  personalities: string[];
}

interface ApiResponse {
  data: Pet[];
}
export const fetchPets = async (token: string): Promise<Pet[]> => {
  console.log('Fetching pets with token:', token);
  const response = await fetch('https://i11b101.p.ssafy.io/api/pets', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('반려동물 정보를 가져오는 데 실패했습니다');
  }

  const result: ApiResponse = await response.json();
  console.log('Fetched pets:', result);
  return result.data;
};

export const addPet = async (formData: FormData, token: string) => {
  console.log('Adding pet with token:', token);
  const response = await fetch('https://i11b101.p.ssafy.io/api/pets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('반려동물을 추가하는 데 실패했습니다');
  }

  const data = await response.json();
  console.log('Added pet response:', data);
  return data;
};
