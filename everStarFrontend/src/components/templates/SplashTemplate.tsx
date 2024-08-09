import RocketSpinner from 'assets/symbols/rocket-splash.gif';
import BookSpinner from 'assets/symbols/book-splash.gif';

interface SplashProps {
  type: 'splash' | 'book' | 'rocket';
  className?: string;
}

export const SplashTemplate = ({ type, className }: SplashProps) => {
  return (
    <div className={`${className} flex justify-center items-center min-h-screen`}>
      <div className='flex flex-col items-center justify-center text-center'>
        {type === 'splash' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img src={RocketSpinner} alt='Spinner' className='mb-4 w-[100px] h-[100px]' />
            <p className='kor-h-h2'>위로와 치유의 공간, 영원별에 오신 것을 환영합니다.</p>
          </div>
        )}
        {type === 'rocket' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img src={RocketSpinner} alt='Spinner' className='mb-4 w-[100px] h-[100px]' />
            <p className='kor-h-h2'>반려동물이 있는 곳, 영원별입니다! 응원메시지를 작성해보세요.</p>
          </div>
        )}
        {type === 'book' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img src={BookSpinner} alt='Spinner' className='mb-4 w-[100px] h-[100px]' />
            <p className='kor-h-h2'>메모리얼북으로 이동중입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
