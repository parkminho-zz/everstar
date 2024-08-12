import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 로컬 이미지 가져오기
import tutorial1 from 'assets/images/tutorial1.png';
import tutorial2 from 'assets/images/tutorial2.png';
import tutorial3 from 'assets/images/tutorial3.png';
import tutorial4 from 'assets/images/tutorial4.png';
import tutorial5 from 'assets/images/tutorial5.png';

const images = [tutorial1, tutorial2, tutorial3, tutorial4, tutorial5];

export const TutorialPage = () => {
  const sliderRef = React.useRef<Slider>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleSkip = () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(images.length - 1); // 마지막 슬라이드로 이동
    }
  };

  return (
    <div className='relative flex flex-col w-screen h-screen bg-gray-100'>
      {/* 슬라이더 */}
      <div className='flex-grow'>
        <Slider
          ref={sliderRef}
          infinite={false} // 5에서 반대 1로 넘어가는거, 1에서 반대 5로 넘어가는거
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          dots={true} // 밑에 점으로 표시하는거
          arrows={false} // 기본 화살표 비활성화
        >
          {images.map((image, index) => (
            <div key={index} className='relative h-[calc(100vh-8rem)]'>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className='object-contain w-full h-full'
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 하단 버튼 */}
      <div className='absolute flex items-center justify-between px-80 left-20 right-20 bottom-10'>
        <div className='flex justify-start flex-grow'>
          <button
            onClick={handleSkip}
            className='px-4 py-2 text-lg font-medium text-blue-500'
          >
            SKIP
          </button>
        </div>
        <div className='flex flex-none space-x-3'>
          <button
            onClick={handlePrev}
            className='px-4 py-2 text-white bg-blue-500 rounded'
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className='px-4 py-2 text-white bg-blue-500 rounded'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
