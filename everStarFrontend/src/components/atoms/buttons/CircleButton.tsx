import React from 'react';
import CircleWhite from 'assets/images/circle-white.svg';
import CircleDisabled from 'assets/images/circle-disabled.svg';
import CircleHover from 'assets/images/circle-hover.svg';
import CircleFocus from 'assets/images/circle-focus.svg';
import PlusIcon from 'components/atoms/icons/Plus/PlusIcon';
import MicrophoneIcon from 'components/atoms/icons/Microphone/MicrophoneIcon';
import PhoneStopIcon from 'components/atoms/icons/PhoneStop/PhoneStopIcon';
import PhoneIcon from 'components/atoms/icons/Phone/PhoneIcon';
import VideoIcon from 'components/atoms/icons/Video/VideoIcon';
import SettingsIcon from 'components/atoms/icons/Settings/SettingsIcon';
import ChatIcon from 'components/atoms/icons/Chat/ChatIcon';
import ShareIcon from 'components/atoms/icons/Share/ShareIcon';

type CircleButtonTheme = 'focus' | 'hover' | 'white';
type RtcIconTheme =
  | 'plus'
  | 'mic'
  | 'phone'
  | 'phoneStop'
  | 'video'
  | 'settings'
  | 'chat'
  | 'share';

interface ICircleButtonProps {
  theme: CircleButtonTheme;
  disabled: boolean;
  icon: RtcIconTheme;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<RtcIconTheme, React.ComponentType<any>> = {
  plus: PlusIcon,
  mic: MicrophoneIcon,
  phone: PhoneIcon,
  phoneStop: PhoneStopIcon,
  video: VideoIcon,
  settings: SettingsIcon,
  chat: ChatIcon,
  share: ShareIcon,
};

export default function CircleButton({ theme, icon, onClick, disabled }: ICircleButtonProps) {
  const getBgPath = () => {
    if (disabled) return CircleDisabled;
    switch (theme) {
      case 'focus':
        return CircleFocus;
      case 'hover':
        return CircleHover;
      case 'white':
      default:
        return CircleWhite;
    }
  };

  const getColor = () => {
    if (disabled) return 'gray';
    if (theme === 'focus') return 'white';
    return 'black';
  };

  const IconComponent = iconMap[icon];

  return (
    <button
      className="relative flex items-center justify-center rounded-lg px-4 w-[120px] h-[120px]"
      disabled={disabled}
      onClick={onClick}
    >
      <img
        src={getBgPath()}
        alt="circle button background"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <div className="relative flex items-center justify-center" style={{ zIndex: 1 }}>
        <IconComponent size={24} color={getColor()} />
      </div>
    </button>
  );
}
