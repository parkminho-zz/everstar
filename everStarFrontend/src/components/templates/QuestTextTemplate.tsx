import React, { useEffect, useState } from 'react';
import { InteractiveForm } from 'components/templates/InteractiveForm';
import { Glass } from 'components/molecules/Glass/Glass';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { useNavigate } from 'react-router-dom';

export const QuestTextTemplate = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [questContent, setQuestContent] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { questid } = useParams<{ questid: string }>();
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    getQuest();
  }, []);

  const getQuest = async () => {
    try {
      const response = await axios.get(
        `https://i11b101.p.ssafy.io/api/pets/${petId}/quests/${questid}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        console.log('성공:', response.data);
        setQuestContent(response.data.content);
      }
    } catch (error) {
      console.error('퀘스트 데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setLoading(false); // 데이터 로딩 후 로딩 상태 업데이트
    }
  };

  const answerQuestion = async () => {
    const formData = new FormData();
    const requestDto = JSON.stringify({ content: text, type: 'TEXT' });

    const requestDtoBlob = new Blob([requestDto], {
      type: 'application/json',
    });
    formData.append('requestDto', requestDtoBlob);

    try {
      const response = await axios.post(
        `https://i11b101.p.ssafy.io/api/pets/${petId}/quests/${questid}/answers`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Response:', response.data);

      return response.status;
    } catch (error) {
      console.error('답변 전송 중 오류 발생:', error);
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    console.log('입력된 텍스트:', text);
  };

  const handleSubmit = async () => {
    const status = await answerQuestion();

    if (status === 200) {
      console.log('성공');
      navigate('/earth');
    } else {
      console.log('실패');
    }
  };

  // 로딩 중이거나 퀘스트 데이터가 없으면 로딩 스피너 또는 빈 화면을 보여줌
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative items-center justify-center min-h-screen fle'>
      <Glass
        currentPage={1}
        totalPages={1}
        onPageChange={() => console.log('이동')}
        showPageIndicator={false}
        className='w-full h-auto sm:w-4/5 md:w-3/5 lg:w-2/5 sm:h-4/5'
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <InteractiveForm
          currentPage={1}
          totalPages={1}
          onPageChange={(newPage) => console.log('Page changed to:', newPage)}
          headerText='오늘의 질문'
          letterCardType='default'
          letterCardColor='white'
          letterCardState='notReceived'
          letterCardMessage={questContent} // 로드된 퀘스트 내용 표시
          centered={true}
          textboxLabel='답변'
          largeButtonText='이미지 추가'
          smallButtonText='작성완료'
          showPrimaryButton={false}
          onTextChange={handleTextChange}
          value={text}
          onButtonClick={handleSubmit}
        />
      </div>
    </div>
  );
};
