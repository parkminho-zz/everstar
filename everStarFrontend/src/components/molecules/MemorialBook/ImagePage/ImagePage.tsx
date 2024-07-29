import React from 'react';

export interface ImagePageProps {
  question: string;
  petName: string;
  myImage: string;
  myAnswer: string;
  petImage: string;
  petAnswer: string;
}

export const ImagePage: React.FC<ImagePageProps> = ({
  question,
  petName,
  myImage,
  myAnswer,
  petImage,
  petAnswer,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-between p-5 h-[600px] w-[360px] mx-auto">
      <div className="text-center">
        <span className="block text-xl font-bold leading-tight tracking-wide font-kor-h-h2 text-greyscaleblack-100">
          Q.
        </span>
        <p className="mt-2 text-base leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100">
          {question}
        </p>
      </div>
      <div className="flex flex-col items-center mt-4 w-full">
        <img src={myImage} alt="My Answer" className="w-[180px] h-[135px] object-cover mb-2" />
        <p className="text-base font-bold leading-6 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100">
          나의 답변
        </p>
        <p className="mt-2 text-base leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100">
          {myAnswer}
        </p>
      </div>
      <div className="flex flex-col items-center mt-4 w-full">
        <img src={petImage} alt="Pet's Answer" className="w-[180px] h-[135px]object-cover mb-2" />
        <p className="text-base font-bold leading-6 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100">
          {petName}의 답변
        </p>
        <p className="mt-2 text-base leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100">
          {petAnswer}
        </p>
      </div>
    </div>
  );
};
