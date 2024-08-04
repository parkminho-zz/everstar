import { useQuery } from '@tanstack/react-query';
import { fetchReads } from 'api/read/readApi';
import { fetchReadById } from 'api/read/readApi';

export const useReads = () => {
  return useQuery({
    queryKey: ['reads'], // 쿼리 키는 배열로 제공
    queryFn: fetchReads, // 쿼리 함수
  });
};

export const useReadById = (id: number) => {
  return useQuery({
    queryKey: ['read', id], // 쿼리 키, ID에 따라 다르게 설정
    queryFn: () => fetchReadById(id), // 쿼리 함수
    enabled: !!id, // ID가 있을 때만 쿼리를 실행하도록 설정
  });
};
