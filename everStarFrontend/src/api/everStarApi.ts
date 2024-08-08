import config from 'config';

export interface Cheering {
  content: string;
  color: string;
  isAnonymous: boolean;
}

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

export const fetchPetPost = async (
  data: { content: string; color: string; isAnonymous: boolean },
  token: string,
  petId: number,
  paramsId: number
) => {
  console.log('Adding pet with token:', token);
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/find/${paramsId}/cheeringMessages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('포스트잇 추가하는 데 실패했어');
  }

  const result = await response.json();
  console.log('Added pet response:', result);
  return result;
};

export const fetchPetIntroduction = async (
  introduction: string,
  token: string,
  petId: number
) => {
  console.log('Adding pet with token:', token);
  const response = await fetch(`${config.API_BASE_URL}/api/pets/${petId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ introduction }),
  });

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('자기소개 수정 실패했어');
  }

  const result = await response.json();
  console.log('modify pet response:', result);
  return result;
};
