import Plus from '../../../atoms/icons/Plus/PlusIcon';

export const PostItPlusCard = () => {
  return (
    <div className="flex flex-col w-[142px] h-[152px] items-center gap-[18px] pt-16 pb-3 px-0 absolute shadow-md">
      <div className="relative items-center">
        <Plus size={24} color="black" />
      </div>
    </div>
  );
};
