import React from 'react';
import PropTypes from 'prop-types';

interface QuestionPageProps {
  title: string;
  description: string;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ title, description }) => {
  return (
    <div className="inline-flex items-start justify-center gap-5 relative">
      <div className="flex flex-col w-[294px] items-start gap-4 relative">
        <div className="relative self-stretch h-[33px] mt-[-1.00px] font-kor-h-h2 font-bold text-greyscaleblack-100 text-xl text-center tracking-wide leading-8">
          {title}
        </div>
        <p className="relative self-stretch font-kor-subtitle-subtitle1 font-medium text-greyscaleblack-100 text-base text-center tracking-wide leading-6">
          {description}
        </p>
      </div>
    </div>
  );
};

QuestionPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export { QuestionPage };
export type { QuestionPageProps };
