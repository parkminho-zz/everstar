import config from 'config';

export const fetchLetterPost = async (
  petId: number,
  formData: FormData,
  token: string
) => {
  console.log('Adding pet with token:', token);
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/letters`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('편지 보내기에 실패했습니다');
  }

  const data = await response.json();
  console.log('post letter response:', data);
  return data;
};
