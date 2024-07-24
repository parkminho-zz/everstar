import Arrow from "../../assets/icons/arrow.png";
import ArrowWhite from "../../assets/icons/arrow-white.png";
import ArrowGray from "../../assets/icons/arrow-gray.png";

type PrimaryButtonTheme = "primary" | "light" | "white";
type PrimaryButtonSize = "large" | "medium" | "small";

interface IPrimaryButtonProps {
  theme: PrimaryButtonTheme;
  size: PrimaryButtonSize;
  disabled: boolean;
  children: string;
  alt: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const primary = "bg-primary text-white";
const white = "bg-white text-black";
const light = "bg-bgOrange text-black";
const disabledStyle = "disabled:bg-gray20 disabled:text-gray60";

const color: Record<PrimaryButtonTheme, string> = {
  primary,
  white,
  light,
};

const large = "w-[320px] h-[64px]";
const medium = "w-[134px] h-[48px]";
const small = "w-[106px] h-[40px]";

const sizeStyle: Record<PrimaryButtonSize, string> = {
  large,
  medium,
  small,
};

export default function PrimaryButton({
  theme,
  size,
  children,
  alt,
  onClick,
  disabled,
}: IPrimaryButtonProps) {
  const getIconPath = () => {
    if (disabled) return ArrowGray;
    switch (theme) {
      case "primary":
        return ArrowWhite;
      case "light":
      case "white":
      default:
        return Arrow;
    }
  };

  return (
    <button
      className={`
        flex
        items-center
        justify-between
        rounded-lg
        w-full 
        h-[59px] 
        px-4
        ${disabledStyle}
        ${color[theme]}
        ${sizeStyle[size]}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="mx-auto flex-grow text-center">{children}</span>
      <img className="ml-auto" src={getIconPath()} alt={alt} />
    </button>
  );
}
