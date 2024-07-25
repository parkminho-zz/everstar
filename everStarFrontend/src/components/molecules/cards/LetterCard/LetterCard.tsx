import { InformationText } from 'components/atoms/texts/InformationText';
import { LetterText } from 'components/atoms/texts/LetterText';
type LetterType = 'default' | 'send' | 'receive';
type LetterColor = 'white' | 'bgorange' | 'orange' | 'gray';
type LetterState = 'received' | 'notReceived';

interface ILetterProps {
  type: LetterType;
  color: LetterColor;
  state: LetterState;
  name: string;
  sendMessage?: string;
  message?: string;
  dateTime: string;
}

export const LetterCard = ({
  type,
  color,
  name,
  sendMessage,
  state,
  message,
  dateTime,
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
  return (
    <div
      className={`${getBgColor()} flex flex-col self-stretch gap-[16px] p-4 rounded-[20px] shadow-md ${type === 'default' ? 'w-[270px]' : 'w-[320px]'}`}
    >
      <LetterText size="large" color={getTextColor()}>
        {name}
      </LetterText>
      {type === 'default' && (
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-row gap-[10px]">
            <LetterText size="medium" color="black">
              보낸 편지
            </LetterText>
            <LetterText size="small" color={getTextColor()}>
              {sendMessage}
            </LetterText>
          </div>
          <div className="flex flex-row gap-[10px]">
            <LetterText size="medium" color="black">
              상태
            </LetterText>
            <LetterText size="small" color={getTextColor()}>
              {getState()}
            </LetterText>
          </div>
        </div>
      )}
      {type === 'receive' && (
        <div>
          <LetterText size="small" color="black">
            {message}
          </LetterText>
        </div>
      )}
      {type === 'send' && (
        <div>
          <LetterText size="small" color="black">
            {message}
          </LetterText>
        </div>
      )}
      <hr className="border-greyscaleblack-60 border-0.5" />
      <div className="flex justify-end">
        <InformationText
          state="default"
          divClassName={color === 'orange' ? 'text-greyscalewhite' : ''}
        >
          {dateTime}
        </InformationText>
      </div>
    </div>
  );
};
