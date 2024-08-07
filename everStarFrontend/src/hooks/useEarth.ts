import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { RootState } from 'store/Store';
import { fetchLetterPost } from 'api/earthApi';

// 타입 정의 (필요에 따라 수정)
interface LetterResponse {
  // 예시로, API 응답에 맞게 정의
  success: boolean;
  message?: string;
}

export const usePostLetter = () => {
  // 리덕스에서 petId와 token을 가져오기
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  // useMutation 훅을 통해 편지 전송 API 호출을 관리
  return useMutation<LetterResponse, Error, { formData: FormData }>({
    mutationFn: async ({ formData }) => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      return fetchLetterPost(petId, formData, token);
    },
    onSuccess: (data) => {
      console.log('Letter posted successfully:', data);
      // 성공 시 작업을 추가할 수 있음
    },
    onError: (error) => {
      console.error('Error posting letter:', error);
      // 실패 시 작업을 추가할 수 있음
    },
  });
};
