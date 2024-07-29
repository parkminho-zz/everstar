import React from 'react';
import PropTypes from 'prop-types';

interface QuestionPageProps {
  title: string;
  petName: string;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ title, petName }) => {
  return (
    <div className="w-[360px] p-4 mx-auto">
      <div className="w-full text-center">
        <span className="block text-xl font-bold leading-tight tracking-wide font-kor-h-h2 text-greyscaleblack-100">
          Q.
        </span>
        <p className="mt-2 text-base leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100">
          {title}
        </p>
        <p className="mt-2 text-base leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100">
          {petName}와 행복했던 순간을 말해주세요.
        </p>
      </div>
    </div>
  );
};

QuestionPage.propTypes = {
  title: PropTypes.string.isRequired,
  petName: PropTypes.string.isRequired,
};

export { QuestionPage };
export type { QuestionPageProps };
