import React from 'react';

interface DropdownMenuProps {
  options: (string | number)[];
  onOptionSelect: (option: string | number) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onOptionSelect }) => {
  return (
    <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white rounded-md shadow-lg max-h-60">
      <ul className="py-1">
        {options.map((option, index) => (
          <li
            key={index}
            className="z-10 flex items-center justify-start p-4 mt-1 list-none cursor-pointer text-kor-h-h3"
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
