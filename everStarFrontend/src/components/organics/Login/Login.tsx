import React, { useState } from 'react';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { KakaoLoginButton } from 'components/atoms/buttons/KakaoLoginButton';
import { GoogleLoginButton } from 'components/atoms/buttons/GoogleLoginButton';
import { OnboardingDescription } from 'components/organics/OnboardingDescription/OnboardingDescription';

export const Login: React.FC = () => {
  const [page, setPage] = useState<'page-1' | 'page-2' | 'page-3' | 'page-4'>('page-1');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '360px',
        height: '800px',
        gap: '16px',
        position: 'relative',
      }}
    >
      <LogoIcons variant="star" />
      <OnboardingDescription page={page} onChangePage={setPage} />
      <KakaoLoginButton size="large" variant="narrow" />
      <GoogleLoginButton shape="square" variant="ctn" />
    </div>
  );
};
