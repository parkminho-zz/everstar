import React from 'react';

export interface ImagePageProps {
  question: string;
  myImage: string;
  myAnswer: string;
  petImage: string;
  petAnswer: string;
}

export const ImagePage: React.FC<ImagePageProps> = ({ question, myImage, myAnswer, petImage, petAnswer }) => {
  return (
    <div className="inline-flex flex-col items-center justify-center gap-5 p-5 relative">
      <div className="flex flex-col w-full items-start gap-4 relative">
        <div className="relative self-stretch h-[33px] font-kor-h-h2 font-bold text-greyscaleblack-100 text-xl text-center tracking-wide leading-8">
          {question}
        </div>
        <div className="flex justify-around w-full mt-4">
          <div className="flex flex-col items-center">
            <img src={myImage} alt="My Answer" className="w-40 h-40 object-cover mb-2" />
            <p className="font-kor-subtitle-subtitle1 font-medium text-greyscaleblack-100 text-base text-center tracking-wide leading-6">
              나의 답변: {myAnswer}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={petImage} alt="Pet's Answer" className="w-40 h-40 object-cover mb-2" />
            <p className="font-kor-subtitle-subtitle1 font-medium text-greyscaleblack-100 text-base text-center tracking-wide leading-6">
              반려동물의 답변: {petAnswer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
