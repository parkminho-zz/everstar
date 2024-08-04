import { ApiConfig } from 'api/ApiConfig';

//GET 요청을 보내는 함수
export const fetchReads = () =>
  ApiConfig.get('/reads').then((response) => response.data);

//GET 요청을 보내는 함수
export const fetchReadById = (id: number) =>
  ApiConfig.get(`/reads/${id}`).then((response) => response.data);

// POST 요청을 보내는 함수
export const createRead = (data: { title: string; content: string }) => {
  return ApiConfig.post('/reads', data).then((response) => response.data);
};
