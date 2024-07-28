import React from 'react';
import PropTypes from 'prop-types';

interface QuestionProps {
  title: string;
  description: string;
}

const Question: React.FC<QuestionProps> = ({ title, description }) => {
  return (
    <div className="inline-flex items-start justify-center gap-5 relative">
      <div className="flex flex-col w-[294px] items-start gap-4 relative">
        <div className="relative self-stretch h-[33px] mt-[-1.00px] font-kor-h-h2 font-[number:var(--kor-h-h2-font-weight)] text-greyscaleblack-100 text-[length:var(--kor-h-h2-font-size)] text-center tracking-[var(--kor-h-h2-letter-spacing)] leading-[var(--kor-h-h2-line-height)] [font-style:var(--kor-h-h2-font-style)]">
          {title}
        </div>
        <p className="relative self-stretch font-kor-subtitle-subtitle1 font-[number:var(--kor-subtitle-subtitle1-font-weight)] text-greyscaleblack-100 text-[length:var(--kor-subtitle-subtitle1-font-size)] text-center tracking-[var(--kor-subtitle-subtitle1-letter-spacing)] leading-[var(--kor-subtitle-subtitle1-line-height)] [font-style:var(--kor-subtitle-subtitle1-font-style)]">
          {description}
        </p>
      </div>
    </div>
  );
};

Question.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export { Question };
export type { QuestionProps };
