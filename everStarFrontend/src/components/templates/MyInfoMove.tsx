import React from 'react';
import { MoveContainer } from 'components/organics/input/MoveContainer/MoveContainer';
import { useNavigate } from 'react-router-dom';

interface EverStarSearchStarProps {}

export const MyinfoMove: React.FC<EverStarSearchStarProps> = () => {
  const navigate = useNavigate();

  const handleNextPage1Click = () => {
    navigate('/mypage/myinfo');
  };

  const handleNextPage2Click = () => {
    navigate('/mypage/profile');
  };

  const handleLeftIconClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <MoveContainer
        title="마이 페이지"
        nextPage1="mypage"
        nextPage2="profile"
        onNextPage1Click={handleNextPage1Click}
        onNextPage2Click={handleNextPage2Click}
        onLeftIconClick={handleLeftIconClick} // 뒤로 가기 핸들러 추가
      />
    </div>
  );
};

export type { EverStarSearchStarProps };
