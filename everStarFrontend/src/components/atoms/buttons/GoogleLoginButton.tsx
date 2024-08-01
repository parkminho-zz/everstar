import React from 'react';
import webNeutralRdCtn from 'assets/symbols/web_neutral_rd_ctn.svg';
import webNeutralRdNa from 'assets/symbols/web_neutral_rd_na.svg';
import webNeutralRdSI from 'assets/symbols/web_neutral_rd_SI.svg';
import webNeutralRdSU from 'assets/symbols/web_neutral_rd_SU.svg';
import webNeutralSqCtn from 'assets/symbols/web_neutral_sq_ctn.svg';
import webNeutralSqNa from 'assets/symbols/web_neutral_sq_na.svg';
import webNeutralSqSI from 'assets/symbols/web_neutral_sq_SI.svg';
import webNeutralSqSU from 'assets/symbols/web_neutral_sq_SU.svg';

interface GoogleLoginButtonProps {
  shape: 'round' | 'square';
  variant: 'ctn' | 'na' | 'SI' | 'SU';
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ shape, variant }) => {
  let src = '';

  if (shape === 'round' && variant === 'ctn') {
    src = webNeutralRdCtn;
  } else if (shape === 'round' && variant === 'na') {
    src = webNeutralRdNa;
  } else if (shape === 'round' && variant === 'SI') {
    src = webNeutralRdSI;
  } else if (shape === 'round' && variant === 'SU') {
    src = webNeutralRdSU;
  } else if (shape === 'square' && variant === 'ctn') {
    src = webNeutralSqCtn;
  } else if (shape === 'square' && variant === 'na') {
    src = webNeutralSqNa;
  } else if (shape === 'square' && variant === 'SI') {
    src = webNeutralSqSI;
  } else if (shape === 'square' && variant === 'SU') {
    src = webNeutralSqSU;
  }

  const style = shape === 'square' && variant === 'ctn' ? { width: '366px', height: '90px' } : {};

  return <img src={src} alt={`google login button ${shape} ${variant}`} style={style} />;
};
