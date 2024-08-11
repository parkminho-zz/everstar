import config from 'config';

export interface Alram {
  deviceToken: string;
}

export const fetchAlramPost = async (
  data: { deviceToken: string },
  token: string
) => {
  console.log('serviceWortker diveceToken:', data);
  const response = await fetch(`${config.API_BASE_URL}/api/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('서비스워커 등록 실패실패 대실패');
  }

  const result = await response.json();
  console.log('서비스워커 등록 성공성공 대성공:', result);
  return result;
};
