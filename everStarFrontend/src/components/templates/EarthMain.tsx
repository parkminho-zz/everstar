import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Rainbow } from 'components/atoms/symbols/Rainbow/Rainbow';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { ProgressCard } from 'components/organics/ProgressCard/ProgressCard';
import { LetterCard } from 'components/molecules/cards/LetterCard/LetterCard';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { firebaseConfig } from 'firebase-messaging-sw';
import { Modal } from 'components/molecules/Modal/Modal';

type ViewMemorialBookSize = 'large' | 'medium' | 'small';
type RainbowColor =
  | 'none'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'violet';

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
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const [letterCardVisible, setLetterCardVisible] = useState(false);
  const [letterMessage, setLetterMessage] = useState('');
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const isMessageSeen = localStorage.getItem('isMessageSeen');
    const isMessage = localStorage.getItem('isMessage');
    if (isMessage !== null) {
      setLetterMessage(isMessage);
    }
    if (isMessageSeen !== 'true' && isMessageSeen !== null) {
      setLetterCardVisible(true);
    }
  }, [letterCardVisible, letterMessage]);

  onMessage(messaging, (payload) => {
    setLetterCardVisible(true);

    switch (payload.notification?.title) {
      case '카툰화':
        setLetterMessage('카툰이 도착했어요');
        localStorage.setItem('isMessage', '카툰이 도착했어요');
        localStorage.setItem('isMessageSeen', 'false');
        break;

      case '편지':
        setLetterMessage('편지가 도착했어요');
        localStorage.setItem('isMessage', '편지가 도착했어요');
        localStorage.setItem('isMessageSeen', 'false');
        break;

      default:
        return;
    }

    console.log(
      'Message received (foreground). : ',
      // payload.notification?.title
      payload
    );
  });

  const handleButtonClick = () => {
    onButtonClick();
    navigate(`/everstar/${petId}`);
  };

  const handleLetterCardClick = () => {
    const type = localStorage.getItem('isMessage');

    switch (type) {
      case '편지가 도착했어요':
        setLetterCardVisible(false);
        localStorage.setItem('isMessageSeen', 'true');
        break;

      case '카툰이 도착했어요':
        setLetterCardVisible(false);
        localStorage.setItem('isMessageSeen', 'true');
        setModalState(true);
        break;

      default:
        break;
    }
  };
  const Modalclose = () => {
    setModalState(false);
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

  const getOpenvidu = () => {
    navigate(`/earth/openvidu`);
  };

  return (
    <div>
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
        </div>
      </div>
      <div className='fixed right-12 bottom-14'>
        <LetterCard
          type='receive'
          color='gray'
          state='received'
          name='알림'
          message={letterMessage}
          dateTime=''
          className='h-5'
          centered={true}
          visible={letterCardVisible}
          onClick={handleLetterCardClick}
        />
      </div>
      <div>
        <Modal isOpen={modalState} onClose={Modalclose} text=''>
          <img src='https://picsum.photos/500/500' alt='Description' />
          <p>한번밖에 볼 수 없어요! 추후 메모리얼북이 완성 시 확인 가능해요!</p>
        </Modal>
      </div>
    </div>
  );
};
