import React from 'react';

interface QuestionPageProps {
  title: string;
  myAnswer: string;
  petName: string;
  petAnswer?: string; // Optional prop
  myImage?: string; // Optional prop
  petImage?: string; // Optional prop
}

const getFontSize = (text: string) => {
  if (text.length > 200) return 'text-xs';
  if (text.length > 150) return 'text-sm';
  return 'text-base';
};

const QuestionPage: React.FC<QuestionPageProps> = ({
  title,
  myAnswer,
  petName,
  petAnswer,
  myImage,
  petImage,
}) => {
  return (
    <div className="relative flex flex-col p-4 h-[508px] w-[360px] mx-auto bg-white border border-gray-300 shadow-md overflow-hidden">
      <div className="mb-4 text-center">
        <span className="block text-lg font-bold leading-tight tracking-wide font-kor-h-h2 text-greyscaleblack-100">
          Q.
        </span>
        <p
          className={`mt-1 leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100 ${getFontSize(title)}`}
        >
          {title}
        </p>
      </div>
      <div className="flex items-start w-full mb-4">
        {myImage && (
          <img
            src={`${myImage}?timestamp=${Date.now()}`}
            alt="My Answer"
            className="w-[150px] h-[150px] object-cover mr-4 shadow-sm rounded-md"
            crossOrigin="anonymous"
          />
        )}
        <div className="flex flex-col">
          <p className="text-sm font-bold leading-5 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100">
            나의 답변
          </p>
          <p
            className={`mt-1 leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100 ${getFontSize(myAnswer)}`}
          >
            {myAnswer}
          </p>
        </div>
      </div>
      {(petAnswer || petImage) && (
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <p className="text-sm font-bold leading-5 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100">
            {petName}의 답변
          </p>
          {petImage && (
            <div className="relative flex items-center justify-center w-[150px] h-[150px] mt-2 mb-2">
              <img
                src={`${petImage}?timestamp=${Date.now()}`}
                alt={`${petName}의 답변`}
                className="w-[150px] h-[150px] object-cover shadow-sm rounded-md"
                crossOrigin="anonymous"
              />
            </div>
          )}
          {petAnswer && (
            <p
              className={`text-sm leading-tight tracking-wide text-center font-kor-p-p1 text-greyscaleblack-100 ${getFontSize(petAnswer)}`}
            >
              {petAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export { QuestionPage };
export type { QuestionPageProps };
