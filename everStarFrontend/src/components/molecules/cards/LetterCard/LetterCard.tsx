import { InformationText } from 'components/atoms/texts/InformationText';
import { LetterText } from 'components/atoms/texts/LetterText';

type LetterType = 'default' | 'send' | 'receive';
type LetterColor = 'white' | 'bgorange' | 'orange' | 'gray';
type LetterState = 'received' | 'notReceived';

interface ILetterProps {
  type: LetterType;
  color: LetterColor;
  state: LetterState;
  name?: string;
  sendMessage?: string;
  message?: string;
  dateTime?: string;
  className?: string;
  centered?: boolean;
}

export const LetterCard = ({
  type,
  color,
  name,
  sendMessage,
  state,
  message,
  dateTime,
  className,
  centered = false,
}: ILetterProps) => {
  const getState = () => {
    if (state === 'received') return '답장 완료';
    else return '작성 중';
  };

  const getTextColor = () => {
    if (color === 'orange') return 'white';
    else if (color === 'gray') return 'gray';
    else return 'black';
  };

  const getBgColor = () => {
    if (color === 'orange') return 'bg-mainprimary';
    if (color === 'white') return 'bg-greyscalewhite';
    if (color === 'bgorange') return 'bg-bgorange';
    if (color === 'gray') return 'bg-greyscaleblack-20';
  };

  const getAlignmentClass = () => {
    return centered ? 'items-center text-center' : '';
  };

  return (
    <div
      className={`${getBgColor()} ${getAlignmentClass()} flex flex-col self-stretch gap-[16px] p-4 rounded-[20px] shadow-md ${type === 'default' ? 'w-[270px]' : 'w-[320px]'}`}
    >
      {name && (
        <LetterText size="large" color={getTextColor()} className={className}>
          {name}
        </LetterText>
      )}
      {type === 'default' && (
        <div className={`flex flex-col gap-[16px] ${centered ? 'items-center' : ''}`}>
          <div className="flex flex-row gap-[10px]">
            <LetterText size="medium" color="black" className={className}>
              보낸 편지
            </LetterText>
            <LetterText size="small" color={getTextColor()} className={className}>
              {sendMessage}
            </LetterText>
          </div>
          <div className="flex flex-row gap-[10px]">
            <LetterText size="medium" color="black" className={className}>
              상태
            </LetterText>
            <LetterText size="small" color={getTextColor()} className={className}>
              {getState()}
            </LetterText>
          </div>
        </div>
      )}
      {(type === 'receive' || type === 'send') && (
        <div>
          <LetterText size="small" color="black" className={className}>
            {message}
          </LetterText>
        </div>
      )}
      <div className="w-full">
        <hr className="border-greyscaleblack-60 border-0.5" />
      </div>
      {dateTime && (
        <div className="flex justify-end w-full">
          <InformationText
            state="default"
            divClassName={color === 'orange' ? 'text-greyscalewhite' : ''}
          >
            {dateTime}
          </InformationText>
        </div>
      )}
    </div>
  );
};
