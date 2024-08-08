import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { LetterIcons } from 'components/atoms/symbols/Letter/LetterIcons';
import { LetterboxIcons } from 'components/atoms/symbols/Letterbox/LetterboxIcons';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { PostitIcons } from 'components/atoms/symbols/Postit/PostitIcons';
import { RocketIcons } from 'components/atoms/symbols/Rocket/RocketIcons';
import { RootState } from 'store/Store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface Props {
  type: 'earth' | 'everstar' | 'mypage';
  className?: string;
}

export const Header: React.FC<Props> = ({ type, className }) => {
  const params = useParams();
  const profileImageUrl = useSelector(
    (state: RootState) => state.pet.petDetails?.profileImageUrl || ''
  );
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const navigate = useNavigate();

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleLetterIconClick = () => {
    navigate('/earth/letter');
  };

  const handleStarIconClick = () => {
    navigate(`/everstar/${petId}`);
  };

  const handleEarthIconClick = () => {
    navigate('/earth');
  };

  const handlePostitIconClick = () => {
    navigate(`/everstar/${params.pet}/message`);
  };

  const handleExploreClick = () => {
    navigate(`/everstar/${petId}/explore`);
  };

  const handleLetterBoxIconClick = () => {
    navigate('/earth/letterbox');
  };

  const handleAvatarIconClick = () => {
    navigate('/mypage');
  };

  const handleMouseEnter = (icon: string) => {
    setHoveredIcon(icon);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  let logoVariant: 'small-earth' | 'small-star' = 'small-earth';
  let content = (
    <>
      <LetterIcons
        variant={hoveredIcon === 'letter' ? 'letter-text' : 'letter'}
        onClick={handleLetterIconClick}
        onMouseEnter={() => handleMouseEnter('letter')}
        onMouseLeave={handleMouseLeave}
        className='cursor-pointer'
      />
      <LetterboxIcons
        variant={hoveredIcon === 'letterbox' ? 'letterbox-text' : 'letterbox'}
        onClick={handleLetterBoxIconClick}
        onMouseEnter={() => handleMouseEnter('letterbox')}
        onMouseLeave={handleMouseLeave}
        className='cursor-pointer'
      />
      <Avatar
        size={hoveredIcon === 'avatar' ? 'text' : 'small'}
        name='마이페이지'
        onClick={handleAvatarIconClick}
        onMouseEnter={() => handleMouseEnter('avatar')}
        onMouseLeave={handleMouseLeave}
        className='cursor-pointer'
        src={profileImageUrl}
      />
    </>
  );

  if (type === 'everstar') {
    content = (
      <>
        <PostitIcons
          variant={hoveredIcon === 'postit' ? 'postit-text' : 'postit'}
          text='응원메시지'
          onClick={handlePostitIconClick}
          onMouseEnter={() => handleMouseEnter('postit')}
          onMouseLeave={handleMouseLeave}
          className='cursor-pointer'
        />
        <RocketIcons
          variant={hoveredIcon === 'rocket' ? 'rocket-text' : 'rocket'}
          onClick={handleExploreClick}
          onMouseEnter={() => handleMouseEnter('rocket')}
          onMouseLeave={handleMouseLeave}
          className='cursor-pointer'
        />
        <Avatar
          size={hoveredIcon === 'avatar' ? 'text' : 'small'}
          name='마이페이지'
          onClick={handleAvatarIconClick}
          onMouseEnter={() => handleMouseEnter('avatar')}
          onMouseLeave={handleMouseLeave}
          className='cursor-pointer'
          src={profileImageUrl}
        />
      </>
    );
    logoVariant = 'small-star';
  } else if (type === 'mypage') {
    content = (
      <>
        <div className='w-6 h-6' />
        <LogoIcons
          variant={
            hoveredIcon === 'small-star-img' ? 'star-text' : 'small-star-img'
          }
          onClick={handleStarIconClick}
          onMouseEnter={() => handleMouseEnter('small-star-img')}
          onMouseLeave={handleMouseLeave}
          className='cursor-pointer'
        />
        <LogoIcons
          variant={
            hoveredIcon === 'small-earth-img' ? 'earth-text' : 'small-earth-img'
          }
          onClick={handleEarthIconClick}
          onMouseEnter={() => handleMouseEnter('small-earth-img')}
          onMouseLeave={handleMouseLeave}
          className='cursor-pointer'
        />
      </>
    );
    logoVariant = 'small-star';
  }

  const logoOnClick = () => {
    if (type === 'earth') {
      return handleEarthIconClick;
    }
    return handleStarIconClick;
  };

  return (
    <div
      className={`flex h-14 items-center justify-center px-4 md:px-8 lg:px-12 relative border-b border-black ${className}`}
    >
      <div
        className={`flex items-center justify-between w-full max-w-screen-lg`}
      >
        <LogoIcons
          variant={logoVariant}
          onClick={logoOnClick()}
          className='cursor-pointer'
        />
        <div className='inline-flex items-center justify-center gap-8 py-2 pl-6 pr-0 md:gap-16 lg:gap-24'>
          {content}
        </div>
      </div>
    </div>
  );
};

export type { Props };
