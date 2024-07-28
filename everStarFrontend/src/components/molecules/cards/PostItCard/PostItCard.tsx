import {CloseIcon} from 'components/atoms/icons/Close/CloseIcon';
type ColorKey = 'pink' | 'green' | 'blue' | 'purple' | 'gray' | 'yellow';

interface IPostItCard {
  contents: string;
  name: string;
  color: ColorKey;
}

const colors: Record<ColorKey, string> = {
  pink: '#FFCFE6',
  green: '#D6F8CF',
  blue: '#CFEEF8',
  purple: '#EBD4FD',
  gray: '#F0F1F1',
  yellow: '#FFFBB0',
};

export const PostItCard = ({ contents, name, color }: IPostItCard) => {
  const colorValue = colors[color];

  return (
    <div
      className={`flex flex-col w-[142px] h-[152px] absolute shadow-md p-2`}
      style={{ backgroundColor: colorValue }}
    >
      <div className="flex items-end justify-end ">
        <CloseIcon size={24} color="black" />
      </div>
      <div className="flex flex-col justify-between flex-1 w-full">
        <label className="max-w-full max-h-[82px] text-greyscaleblack-100 kor-p-p2 line-clamp-4 break-words ">
          {contents}
        </label>
        <label className="mt-1 max-w-full max-h-[22px] mb-3 text-greyscaleblack-60 kor-p-p4 break-words overflow-y-hidden">
          {name}
        </label>
      </div>
    </div>
  );
};
