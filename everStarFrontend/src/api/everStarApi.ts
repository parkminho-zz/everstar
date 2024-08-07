import config from 'config';

export const fetchOtherPetDetails = async (petId: number, token: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/everstar/pets/${petId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('타 반려동물 상세 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();
  console.log('Fetched pet details:', result);

  return result;
};

export const fetchCheeringPet = async (petId: number, token: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/cheeringMessages?page=0&size=12`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('반려동물 상세 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();
  console.log('Fetched pet details:', result);

  return result;
};

export const fetchCheeringPetDelete = async (
  petId: number,
  token: string,
  cheeringMessagesId: number
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/cheeringMessages/${cheeringMessagesId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('포스트잇 삭제 실패했다 다시해봐라');
  }

  const result = await response.json();
  console.log('Fetched pet details:', result);

  return;
};

export const fetchPetExplore = async (petId: number, token: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/everstar/pets/random?excludePetId=${petId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('반려동물 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();
  console.log('Fetched pet details:', result);

  return result;
};
