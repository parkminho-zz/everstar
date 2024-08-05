// readApi.tsx

const baseUrl = 'https://api.example.com';

// GET 요청을 보내는 함수
export const fetchReads = async () => {
  const response = await fetch(`${baseUrl}/reads`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch reads');
  }
  return response.json();
};

// GET 요청을 보내는 함수
export const fetchReadById = async (id: number) => {
  const response = await fetch(`${baseUrl}/reads/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch read with id: ${id}`);
  }
  return response.json();
};

// POST 요청을 보내는 함수
export const createRead = async (data: { title: string; content: string }) => {
  const response = await fetch(`${baseUrl}/reads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create read');
  }
  return response.json();
};
