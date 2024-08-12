import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LetterIcons } from 'components/atoms/symbols/Letter/LetterIcons';
import { RocketIcons } from 'components/atoms/symbols/Rocket/RocketIcons';
import { PostitIcons } from 'components/atoms/symbols/Postit/PostitIcons';
import { LetterboxIcons } from 'components/atoms/symbols/Letterbox/LetterboxIcons';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { ProgressCard } from 'components/organics/ProgressCard/ProgressCard';
import { ViewMemorialBook } from 'components/organics/ViewMemorialBook/ViewMemorialBook';

import './MainActionComponent.css';

interface MainActionComponentProps {
  type: 'earth' | 'everstar';
  profileImageUrl?: string;
  fill: number; // ProgressCard의 fill 값
  toggleStatus?: 'on' | 'off';
  onToggleChange?: (status: 'on' | 'off') => void;
  memorialBookProfile?: {
    isActive?: boolean;
    isOpen?: boolean;
  };
  isOwner?: boolean;
}

export const MainActionComponent: React.FC<MainActionComponentProps> = ({
  type,
  profileImageUrl,
  fill,
  toggleStatus,
  onToggleChange,
  memorialBookProfile,
  isOwner,
}) => {
  const navigate = useNavigate();
  const avatarSrc = profileImageUrl || ''; // 기본 이미지는 Avatar 컴포넌트에서 처리
  const iconSize = 36; // 아이콘 및 아바타 크기를 동일하게 설정

  const commonButtonStyles =
    'flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-200';

  const titleStyles = 'font-kor-h-h2 text-greyscaleblack-100 font-bold';

  const handleViewMemorialBookClick = () => {
    alert('View Memorial Book clicked!');
  };

  const [quest, setQuest] = useState('');

  const handleQuestClick = (questId: string) => {
    navigate(`/earth/quest/${questId}`);
  };

  useEffect(() => {
    // Example to set quest, replace this with actual event source logic
    const fakeQuestId = '1';
    setQuest(fakeQuestId);
  }, []);

  return (
    <div className="main-container">
      {/* ProgressCard Container */}
      <div className="progress-container">
        <ProgressCard
          fill={fill}
          buttonTheme="white"
          buttonDisabled={false}
          buttonText={type === 'earth' ? '영원별로 이동하기' : '지구별로 이동하기'}
          buttonIcon={type === 'earth' ? 'SmallStarImg' : 'SmallEarthImg'}
          onButtonClick={() => alert('Button clicked!')}
          buttonSize="full"
          className="h-full"
        />
      </div>

      {/* Buttons Container */}
      <div className="buttons-container">
        <div className="flex flex-col items-center justify-center w-full h-full max-w-md bg-[#f3f6fb] shadow-[0px_4px_4px_#00000040] rounded-lg p-4">
          <div className="button-group">
            <button
              className={`${commonButtonStyles} flex-1`}
              onClick={() => navigate(type === 'earth' ? '/earth/letter' : '/everstar/message')}
            >
              {type === 'earth' ? (
                <>
                  <LetterIcons variant="letter" size={iconSize} className="mb-2" />
                  <span className={titleStyles}>편지쓰기</span>
                </>
              ) : (
                <>
                  <PostitIcons variant="postit" size={iconSize} className="mb-2" />
                  <span className={titleStyles}>응원메시지</span>
                </>
              )}
            </button>
            <button
              className={`${commonButtonStyles} flex-1`}
              onClick={() => navigate(type === 'earth' ? '/earth/letterbox' : '/everstar/explore')}
            >
              {type === 'earth' ? (
                <>
                  <LetterboxIcons variant="letterbox" size={iconSize} className="mb-2" />
                  <span className={titleStyles}>편지함</span>
                </>
              ) : (
                <>
                  <RocketIcons variant="rocket" size={iconSize} className="mb-2" />
                  <span className={titleStyles}>탐험하기</span>
                </>
              )}
            </button>
          </div>
          <button
            className={`${commonButtonStyles} equal-width-button mt-4`}
            onClick={() => navigate('/mypage')}
          >
            <Avatar iconSize={iconSize} src={avatarSrc} />
            <span className={`${titleStyles} mt-2`}>마이페이지</span>
          </button>
        </div>
      </div>

      {/* Conditional Quest or ViewMemorialBook Component */}
      {type === 'everstar' ? (
        <div className="buttons-container">
          <div className="flex flex-col items-center justify-center w-full h-full max-w-md bg-[#f3f6fb] shadow-[0px_4px_4px_#00000040] rounded-lg p-4">
            <ViewMemorialBook
              onClick={handleViewMemorialBookClick}
              toggleStatus={toggleStatus}
              onToggleChange={onToggleChange}
              isActive={memorialBookProfile?.isActive}
              isOpen={memorialBookProfile?.isOpen}
              isOwner={isOwner}
            />
          </div>
        </div>
      ) : (
        <div className="buttons-container">
          <div className="flex flex-col items-center justify-center w-full h-full max-w-md bg-[#f3f6fb] shadow-[0px_4px_4px_#00000040] rounded-lg p-4">
            {quest && (
              <button
                className="bg-white h-[50px] w-[200px] shadow-lg rounded-md"
                onClick={() => handleQuestClick(quest)}
              >
                {quest}번째 퀘스트가 도착했습니다.
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
