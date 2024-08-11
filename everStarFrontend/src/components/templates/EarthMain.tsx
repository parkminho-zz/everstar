import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useMediaQuery } from 'react-responsive';
import { Rainbow } from 'components/atoms/symbols/Rainbow/Rainbow';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { ProgressCard } from 'components/organics/ProgressCard/ProgressCard';

type ViewMemorialBookSize = 'large' | 'medium' | 'small';
type RainbowColor = 'none' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

interface EarthMainProps {
  title: string;
  fill: number;
  className?: string;
  buttonSize: ViewMemorialBookSize;
  buttonDisabled: boolean;
  buttonText: string;
  buttonIcon: 'SmallStarImg' | 'SmallEarthImg';
  onButtonClick: () => void;
}

const rainbowColors: { min: number; max: number; color: RainbowColor }[] = [
  { min: 0, max: 6, color: 'none' },
  { min: 7, max: 13, color: 'red' },
  { min: 14, max: 20, color: 'orange' },
  { min: 21, max: 27, color: 'yellow' },
  { min: 28, max: 34, color: 'green' },
  { min: 35, max: 41, color: 'blue' },
  { min: 42, max: 48, color: 'indigo' },
  { min: 49, max: 49, color: 'violet' },
];

const getColor = (fill: number) => {
  for (const rainbow of rainbowColors) {
    if (fill >= rainbow.min && fill <= rainbow.max) {
      return rainbow.color;
    }
  }
  return 'none';
};

export const EarthMain: React.FC<EarthMainProps> = ({
  title,
  fill,
  buttonSize,
  buttonDisabled,
  buttonText,
  onButtonClick,
  buttonIcon,
  className,
}) => {
  const [quest, setQuest] = useState('');

  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const handleButtonClick = () => {
    onButtonClick();
    navigate(`/everstar/${petId}`);
  };

  const getRainbowStyle = () => {
    if (isMobile) {
      return 'absolute right-0 bottom-0 w-[375px] h-[667px] mb-48 mr-[-20px] ';
    } else if (isTabletOrMobile) {
      return 'absolute left-0 bottom-0 w-[768px] h-[800px] mb-64';
    } else {
      return 'absolute left-0 bottom-0 w-[1280px] h-[1024px] mb-[-70px]';
    }
  };

  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const getOpenvidu = () => {
    navigate(`/earth/openvidu`);
  };

  const answerQuest = (questId: string) => {
    navigate(`/earth/quest/${questId}`);
  };

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;

    console.log(111);
    console.log(petId);
    const eventSource = new EventSource(`https://i11b101.p.ssafy.io/api/earth/connect/${petId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    eventSource.onmessage = (event) => {
      // 이벤트 데이터 처리
      console.log(event.data);
      if (event.data.length != 0 && event.data !== 'dummy') {
        console.log(event.data);
        if (quest !== event.data) {
          setQuest(event.data);
        }
      }
    };

    return () => {
      // 컴포넌트가 언마운트될 때 SSE 연결 해제
      eventSource.close();
    };
  }, []);
  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen'>
      <Rainbow className={getRainbowStyle()} color={getColor(fill)} />
      <div className='relative z-10 flex flex-col items-center justify-center flex-grow'>
        <ProgressCard
          title={title}
          fill={fill}
          buttonTheme='white'
          buttonSize={buttonSize}
          buttonDisabled={buttonDisabled}
          buttonText={buttonText}
          buttonIcon={buttonIcon}
          onButtonClick={handleButtonClick}
          showMusicControl={false}
          className={className}
        />
        <button
          className='bg-white h-[50px] w-[200px] shadow-lg rounded-md mt-4'
          onClick={getOpenvidu}
        >
          임시버튼
          <br />
          오픈비두 질문으로 이동
        </button>

        {(quest.length === 1 || quest.length === 2) && (
          <button
            className='bg-white h-[50px] w-[200px] shadow-lg rounded-md mt-4'
            onClick={() => answerQuest(quest)}
          >
            {quest}번째 퀘스트가 도착했습니다.
          </button>
        )}
        {quest.length >= 3 && (
          <button disabled onClick={() => answerQuest(quest)}>
            퀘스트를 완료했습니다.
          </button>
        )}
      </div>
    </div>
  );
};
