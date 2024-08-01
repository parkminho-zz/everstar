import React from 'react';
import PropTypes from 'prop-types';

interface ITagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag: React.FC<ITagProps> = ({ children, className }) => {
  return (
    <div
      className={`inline-flex items-center justify-center px-4 py-2 border border-[var(--greyscale-black20,#F0F2F6)] rounded-[8px] shadow-small ${className}`}
    >
      <label className='kor-p-p4 text-greyscaleblack-100'>{children}</label>
    </div>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
