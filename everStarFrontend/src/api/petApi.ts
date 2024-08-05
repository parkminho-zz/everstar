export interface Pet {
  id: number;
  profileImageUrl: string;
  name: string;
}

export interface PetFormData {
  name: string;
  age: number;
  memorialDate: Date | null;
  species: string;
  gender: string;
  relationship: string;
  profileImageUrl: File | null;
  introduction: string;
  personality: string[];
}

interface ApiResponse {
  data: Pet[];
}

export const fetchPets = async (token: string): Promise<Pet[]> => {
  const response = await fetch('https://i11b101.p.ssafy.io/api/pets', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log(token);
    throw new Error('반려동물 정보를 가져오는 데 실패했습니다');
  }
  const result: ApiResponse = await response.json();
  return result.data;
};

export const addPet = async (petData: PetFormData, token: string) => {
  const formData = new FormData();
  formData.append('name', petData.name);
  formData.append('age', petData.age.toString());
  formData.append('memorialDate', petData.memorialDate?.toISOString().split('T')[0] || '');
  formData.append('species', petData.species);
  formData.append('gender', petData.gender);
  formData.append('relationship', petData.relationship);
  formData.append('profileImageUrl', petData.profileImageUrl as File);
  formData.append('introduction', petData.introduction);
  formData.append('questIndex', '1');
  formData.append('personality', JSON.stringify(petData.personality));

  const response = await fetch('https://i11b101.p.ssafy.io/api/pets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('반려동물을 추가하는 데 실패했습니다');
  }

  return response.json();
};
