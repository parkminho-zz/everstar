import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

type pageType = 'mypage' | 'profile' | 'random' | 'search';

interface IMoveContainer {
  title: string;
  nextPage1: pageType;
  nextPage2: pageType;
}
export const MoveContainer = ({
  title,
  nextPage1,
  nextPage2,
}: IMoveContainer) => {
  const goNext = (next: pageType) => {
    switch (next) {
      case 'mypage':
        return '마이페이지';
      case 'profile':
        return '반려동물 변경';
      case 'random':
        return '랜덤 이동';
      case 'search':
        return '검색 이동';
      default:
        return '마이페이지';
    }
  };
  return (
    <div className='flex w-[360px] h-[278px] py-6 px-0 flex-col items-center gap-4 flex-shrink-0 bg-white'>
      <ModalHeader text={title} showLeftIcon={true} />
      <PrimaryButton
        theme='white'
        size='large'
        onClick={() => console.log(goNext(nextPage1))}
        disabled={false}
        icon={<ArrowIcon color='black' direction='right' size={24} />}
      >
        {goNext(nextPage1)}
      </PrimaryButton>
      <PrimaryButton
        theme='white'
        size='large'
        onClick={() => console.log(goNext(nextPage2))}
        disabled={false}
        icon={<ArrowIcon color='black' direction='right' size={24} />}
      >
        {goNext(nextPage2)}
      </PrimaryButton>
    </div>
  );
};
