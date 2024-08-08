import config from 'config';

export interface Letter {
  content: string;
  image: string;
}

export const fetchLetterPost = async (
  data: { content: string; image: string },
  token: string,
  petId: number
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/letters`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('편지 보내기에 실패했습니다');
  }

  const result = await response.json();
  console.log('post letter response:', result);
  return result;
};

export const fetchLetterPet = async (petId: number, token: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/letters`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('편지 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();
  console.log('Fetched pet letters:', result);

  return result;
};

export const fetchLetterPetDetail = async (
  petId: number,
  token: string,
  letterId: number
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/letters/${letterId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('편지 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();
  console.log('Fetched pet letters:', result);

  return result;
};
