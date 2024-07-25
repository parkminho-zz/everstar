import PencilIcon from 'components/atoms/icons/Pencil/PencilIcon';
import { AvatarSquare } from 'components/atoms/symbols/Avatar/AvatarSquare';
import { Tag } from '../../../atoms/buttons/Tag';

interface IProfileCard {
  name: string;
  age: number;
  date: string;
  description: string;
  tagList: string[];
}

export const ProfileCard = ({ name, age, date, description, tagList }: IProfileCard) => {
  const visibleTags = tagList.slice(0, 3);

  return (
    <div className="w-[340px] h-[496px] bg-greyscalewhite shadow-md">
      <AvatarSquare />
      <div className="flex justify-between w-full p-4 h-fit">
        <label className="block kor-h-h3 text-greyscaleblack-100">{name}</label>
        <label className="block text-sm text-greyscaleblack-100">
          {age}살 | {date}
        </label>
      </div>
      <p className="block p-4 mt-2 text-md text-greyscaleblack-80">{description}</p>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-wrap gap-2 p-4 mt-10">
          {visibleTags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </div>
        <div className="mt-8 mr-3">
          <PencilIcon size={24} color="black" />
        </div>
      </div>
    </div>
  );
};
