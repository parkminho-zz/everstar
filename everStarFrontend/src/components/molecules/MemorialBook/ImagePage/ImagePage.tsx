import React from 'react';

export interface ImagePageProps {
  question: string;
  myImage: string;
  myAnswer: string;
  petImage: string;
  petAnswer: string;
}

export const ImagePage: React.FC<ImagePageProps> = ({
  question,
  myImage,
  myAnswer,
  petImage,
  petAnswer,
}) => {
  return (
    <div className="relative inline-flex flex-col items-center justify-center gap-5 p-5">
      <div className="relative flex flex-col items-start w-full gap-4">
        <div className="relative self-stretch h-[33px] font-kor-h-h2 font-bold text-greyscaleblack-100 text-xl text-center tracking-wide leading-8">
          {question}
        </div>
        <div className="flex flex-col items-center mt-4">
          <img src={myImage} alt="My Answer" className="w-[360px] h-[270px] object-cover mb-2" />
          <p className="text-base font-medium leading-6 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100">
            나의 답변: {myAnswer}
          </p>
          <img
            src={petImage}
            alt="Pet's Answer"
            className="w-[360px] h-[270px] object-cover mb-2 mt-4"
          />
          <p className="text-base font-medium leading-6 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100">
            반려동물의 답변: {petAnswer}
          </p>
        </div>
      </div>
    </div>
  );
};
