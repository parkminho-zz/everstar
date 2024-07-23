import React from 'react';
import { ReactComponent as EarthIcon } from '../../../../assets/symbols/logo-earth.svg';
import { ReactComponent as SmallEarthIcon } from '../../../../assets/symbols/logo-small-earth.svg';
import { ReactComponent as VerticalEarthIcon } from '../../../../assets/symbols/logo-vertical-earth.svg';
import { ReactComponent as SmallStarIcon } from '../../../../assets/symbols/logo-small-star.svg';
import { ReactComponent as StarIcon } from '../../../../assets/symbols/logo-star.svg';
import { ReactComponent as VerticalStarIcon } from '../../../../assets/symbols/logo-vertical-star.svg';

interface LogoIconsProps {
  variant: 'earth' | 'small-earth' | 'vertical-earth' | 'small-star' | 'star' | 'vertical-star';
}

const iconMap = {
  'earth': EarthIcon,
  'small-earth': SmallEarthIcon,
  'vertical-earth': VerticalEarthIcon,
  'small-star': SmallStarIcon,
  'star': StarIcon,
  'vertical-star': VerticalStarIcon,
};

const LogoIcons: React.FC<LogoIconsProps> = ({ variant }) => {
  const IconComponent = iconMap[variant];
  return <IconComponent />;
};

export default LogoIcons;
export type { LogoIconsProps };
