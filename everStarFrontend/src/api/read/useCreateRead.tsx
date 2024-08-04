// useCreateRead.tsx
import { useMutation } from '@tanstack/react-query';
import { createRead } from 'api/read/readApi';

export const useCreateRead = () => {
  return useMutation({
    mutationFn: (data: { title: string; content: string }) => createRead(data),
    onSuccess: () => {
      // POST 요청이 성공한 후에 수행할 작업 (예: 데이터 리프레시, 알림 등)
    },
    onError: (error) => {
      // POST 요청이 실패한 경우의 에러 처리
      console.error('Error creating read:', error);
    },
  });
};
