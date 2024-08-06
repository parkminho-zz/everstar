import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { LetterIcons } from 'components/atoms/symbols/Letter/LetterIcons';
import { LetterboxIcons } from 'components/atoms/symbols/Letterbox/LetterboxIcons';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { PostitIcons } from 'components/atoms/symbols/Postit/PostitIcons';
import { RocketIcons } from 'components/atoms/symbols/Rocket/RocketIcons';

interface Props {
  type:
    | 'default'
    | 'tablet-earth'
    | 'mobile-earth'
    | 'everstar'
    | 'tablet-everstar'
    | 'mobile-everstar'
    | 'mypage'
    | 'tablet-mypage'
    | 'mobile-mypage';
  className?: string;
}

export const Header: React.FC<Props> = ({ type, className }) => {
  const navigate = useNavigate();

  const handleLetterIconClick = () => {
    navigate('/earth/letter');
  };

  const handleStarIconClick = () => {
    navigate('/everstar/:id');
  };

  const handleEarthIconClick = () => {
    navigate('/earth');
  };

  const handlePostitIconClick = () => {
    navigate('/everstar/1/message');
  };

  const handleExploreClick = () => {
    navigate('/everstar/1/explore');
  };

  const handleLetterBoxIconClick = () => {
    navigate('/earth/letterbox');
  };

  const handleAvatarIconClick = () => {
    navigate('/mypage');
  };

  let containerClass = 'w-[1358px] gap-[656px]';
  let gapClass = 'gap-12';
  let logoVariant: 'small-earth' | 'small-star' = 'small-earth';
  let content = (
    <>
      <LetterIcons
        variant='letter'
        onClick={handleLetterIconClick}
        className='cursor-pointer'
      />
      <LetterboxIcons
        variant='letterbox'
        onClick={handleLetterBoxIconClick}
        className='cursor-pointer'
      />
      <Avatar
        size='small'
        onClick={handleAvatarIconClick}
        className='cursor-pointer'
      />
    </>
  );

  if (
    type === 'tablet-earth' ||
    type === 'tablet-everstar' ||
    type === 'tablet-mypage'
  ) {
    containerClass = 'w-[768px] gap-[470px]';
    gapClass = 'gap-12';
  } else if (
    type === 'mobile-earth' ||
    type === 'mobile-everstar' ||
    type === 'mobile-mypage'
  ) {
    containerClass = 'w-[360px] gap-14';
    gapClass = 'gap-12';
  }

  if (
    type === 'everstar' ||
    type === 'tablet-everstar' ||
    type === 'mobile-everstar'
  ) {
    content = (
      <>
        <PostitIcons
          variant='postit'
          onClick={handlePostitIconClick}
          className='cursor-pointer'
        />
        <RocketIcons
          variant='rocket'
          onClick={handleExploreClick}
          className='cursor-pointer'
        />
        <Avatar
          size='small'
          onClick={handleAvatarIconClick}
          className='cursor-pointer'
        />
      </>
    );
    logoVariant = 'small-star';
  } else if (
    type === 'mypage' ||
    type === 'tablet-mypage' ||
    type === 'mobile-mypage'
  ) {
    content = (
      <>
        <div style={{ width: '24px', height: '24px' }} />{' '}
        <LogoIcons
          variant='small-star-img'
          onClick={handleStarIconClick}
          className='cursor-pointer'
        />
        <LogoIcons
          variant='small-earth-img'
          onClick={handleEarthIconClick}
          className='cursor-pointer'
        />
      </>
    );
    logoVariant = 'small-star';
  }

  const logoOnClick = () => {
    if (type === 'default' || type.includes('earth')) {
      return handleEarthIconClick;
    }
    return handleStarIconClick;
  };

  return (
    <div
      className={`flex h-14 items-center justify-center gap-2 px-0 py-2 relative border-b [border-bottom-style:solid] border-black ${className}`}
    >
      <div
        className={`flex items-center justify-center relative ${containerClass}`}
      >
        <LogoIcons
          variant={logoVariant}
          onClick={logoOnClick()}
          className='cursor-pointer'
        />
        <div
          className={`inline-flex items-center justify-center ${gapClass} pl-6 pr-0 py-[7px] relative flex-[0_0_auto]`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export type { Props };
