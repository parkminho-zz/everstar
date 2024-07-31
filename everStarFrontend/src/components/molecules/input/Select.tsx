import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';
import { DropdownMenu } from 'components/atoms/DropdownMenu/DropdownMenu';
import { Lable } from 'components/atoms/texts/Lable';

interface SelectProps {
  state: 'after' | 'before';
  className?: string;
  options: (string | number)[];
  title: string;
  starshow : boolean;
  onOptionSelect: (option: string | number) => void;
}

export const Select: React.FC<SelectProps> = ({
  state,
  className = '',
  options,
  title,
  starshow = true,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string | number) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelect(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex flex-col w-80 items-start relative ${className}`} ref={dropdownRef}>
      <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
        <Lable className="!flex-[0_0_auto]" prop="레이블" show={starshow} font="default" />
        <div ref={buttonRef} className="flex flex-row h-14 items-center justify-between gap-2 px-4 py-2 relative self-stretch w-full bg-greyscalewhite rounded-xl overflow-hidden shadow-small" onClick={handleToggle}>
          <div className={`flex-1 text-left ${selectedOption ? 'text-greyscaleblack-100' : 'text-gray-400'} font-bold text-base`}>
            {selectedOption || title}
          </div>
          <div className="flex-none">
            <ArrowIcon size={24} direction={isOpen ? 'up' : 'down'} color={isOpen ? 'orange' : selectedOption ? 'black' : 'gray'} />
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-14 bg-white rounded-md shadow-lg"> {/* mt-14로 버튼 아래로 위치 */}
            <DropdownMenu options={options} onOptionSelect={handleOptionSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

Select.propTypes = {
  state: PropTypes.oneOf(['after', 'before']).isRequired as PropTypes.Validator<'after' | 'before'>,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired).isRequired,
  title: PropTypes.string.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
};

export type { SelectProps };
