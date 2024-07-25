import Arrow from 'components/atoms/icons/Arrow/ArrowIcon';

type PrimaryButtonTheme = 'focus' | 'hover' | 'white';
type PrimaryButtonSize = 'large' | 'medium' | 'small';

interface IPrimaryButtonProps {
  theme: PrimaryButtonTheme;
  size: PrimaryButtonSize;
  disabled: boolean;
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const focus = 'bg-mainprimary text-greyscalewhite';
const white = 'bg-white text-mainsecondary';
const hover = 'bg-bgorange text-mainsecondary';
const disabledStyle = 'disabled:bg-greyscaleblack-20 disabled:text-greyscaleblack-60';

const color: Record<PrimaryButtonTheme, string> = {
  focus,
  white,
  hover,
};

const large = 'w-[320px] h-[64px]';
const medium = 'w-[134px] h-[48px]';
const small = 'w-[106px] h-[40px]';

const sizeStyle: Record<PrimaryButtonSize, string> = {
  large,
  medium,
  small,
};

export default function PrimaryButton({
  theme,
  size,
  children,
  onClick,
  disabled,
}: IPrimaryButtonProps) {
  const getTextStyle = () => {
    switch (size) {
      case 'large':
        return 'kor-h-h3';
      case 'medium':
        return 'kor-subtitle-subtitle2';
      case 'small':
        return 'kor-p-p4';
    }
  };

  const getIconColor = () => {
    if (disabled) return 'gray';
    if (theme === 'focus') return 'white';
    return 'black';
  };

  return (
    <button
      className={`
        flex
        items-center
        justify-between
        rounded-lg
        px-4
        ${disabledStyle}
        ${color[theme]}
        ${sizeStyle[size]}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={`flex-grow mx-auto text-center ${getTextStyle()}`}>{children}</span>
      {/* <img className="ml-auto" src={getIconPath()} alt={alt} /> */}
      <Arrow color={getIconColor()} direction="right" size={size === 'small' ? 16 : 24} />
    </button>
  );
}
