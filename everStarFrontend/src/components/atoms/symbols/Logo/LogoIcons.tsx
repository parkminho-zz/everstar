import React from 'react';
import { ReactComponent as EarthIcon } from 'assets/symbols/logo-earth.svg';
import { ReactComponent as SmallEarthIcon } from 'assets/symbols/logo-small-earth.svg';
import { ReactComponent as SmallEarthImg } from 'assets/symbols/logo-earth-img.svg';
import { ReactComponent as VerticalEarthIcon } from 'assets/symbols/logo-vertical-earth.svg';
import { ReactComponent as SmallStarIcon } from 'assets/symbols/logo-small-star.svg';
import { ReactComponent as StarIcon } from 'assets/symbols/logo-star.svg';
import { ReactComponent as SmallStarImg } from 'assets/symbols/logo-star-img.svg';
import { ReactComponent as VerticalStarIcon } from 'assets/symbols/logo-vertical-star.svg';

interface LogoIconsProps {
  variant:
    | 'earth'
    | 'small-earth'
    | 'small-earth-img'
    | 'vertical-earth'
    | 'small-star'
    | 'small-star-img'
    | 'star'
    | 'vertical-star';
  className?: string;
}

const iconMap = {
  earth: EarthIcon,
  'small-earth': SmallEarthIcon,
  'small-earth-img': SmallEarthImg,
  'vertical-earth': VerticalEarthIcon,
  'small-star': SmallStarIcon,
  'small-star-img': SmallStarImg,
  star: StarIcon,
  'vertical-star': VerticalStarIcon,
};

export const LogoIcons: React.FC<LogoIconsProps> = ({ variant, className }) => {
  const IconComponent = iconMap[variant];
  return <IconComponent className={className} />;
};

export type { LogoIconsProps };
