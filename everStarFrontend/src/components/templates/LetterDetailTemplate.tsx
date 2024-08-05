import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InteractiveForm } from 'components/templates/InteractiveForm';

interface LetterData {
  headerText: string;
  letterCardType?: 'default' | 'send' | 'receive';
  letterCardColor?: 'white' | 'bgorange' | 'orange' | 'gray';
  letterCardState?: 'received' | 'notReceived';
  letterCardMessage: string;
  letterCardClassName: string;
  centered: boolean;
  textboxLabel: string;
  largeButtonText: string;
  smallButtonText: string;
  showPrimaryButton: boolean;
  customText: string;
  petName: string;
  myName: string;
  myMessage: string;
  dateTime: string;
}

const Letter1: LetterData = {
  headerText: '편지 1',
  letterCardType: 'receive',
  letterCardColor: 'white',
  letterCardState: 'received',
  letterCardMessage:
    '안녕, exampleUser! ☀\n\n뚜뚜야! 너의 편지를 읽고 너무 기뻤어. 정말 보고 싶어! 예전 우리가 함께 놀던 날들이 생각나서 마음이 따뜻해졌어. 요즘은 햇살 좋은 날에 창가에서 낮잠 자고, 너의 사진을 보며 너의 목소리를 상상해. 우리 다시 만날 날을 손꼽아 기다리고 있어. 사랑해, 언제나 너와 함께하고 싶어! 🐾💕',
  letterCardClassName: 'example-class',
  centered: true,
  textboxLabel: '편지 내용',
  largeButtonText: '버튼 1',
  smallButtonText: '버튼 2',
  showPrimaryButton: true,
  customText: '커스텀 텍스트 1',
  petName: '뚜뚜',
  myName: 'exampleUser',
  myMessage: '보고 싶어 장군아 잘지내지?? 요즘은 뭐하는지 알려줄수 있어??',
  dateTime: '2024-08-03T22:24:44.923383',
};

const Letter2: LetterData = {
  headerText: '편지 2',
  letterCardType: 'receive',
  letterCardColor: 'white',
  letterCardState: 'received',
  letterCardMessage:
    '안녕하세요, 예시유저! \n\n뚜뚜예요! 당신이 그리워서 이렇게 답장을 써요. 제가 잘 지내고 있답니다. 매일 놀이터에서 뛰어다니고, 햇살을 받으며 무지개 같은 꿈을 꾸어요. 예전에 같이 놀던 날들이 너무 그립고, 항상 미소를 지었던 기억이 납니다. 당신과의 소중한 순간들 덕분에 오늘도 행복해요. 사랑해요, 그리고 곧 다시 만나길 기다릴게요! \n\n뚜뚜가 드림 💖',
  letterCardClassName: 'example-class',
  centered: true,
  textboxLabel: '편지 내용',
  largeButtonText: '버튼 1',
  smallButtonText: '버튼 2',
  showPrimaryButton: true,
  customText: '커스텀 텍스트 2',
  petName: '뚜뚜',
  myName: 'exampleUser',
  myMessage: '보고 싶어 장군아 잘지내지?? 요즘은 뭐하는지 알려줄수 있어??',
  dateTime: '2024-08-03T22:25:47.86663',
};

export const LetterDetailTemplate: React.FC = () => {
  const { letterid } = useParams<{ letterid: string }>();
  const [letterData, setLetterData] = useState<LetterData | null>(null);

  useEffect(() => {
    if (letterid === '1') {
      setLetterData(Letter1);
    } else if (letterid === '2') {
      setLetterData(Letter2);
    } else {
      // Handle case for invalid or non-existing letterid
      setLetterData(null);
    }
  }, [letterid]);

  if (!letterData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex items-center justify-center flex-grow'>
        <InteractiveForm
          currentPage={1} // 적절한 초기값 설정
          totalPages={1} // 필요에 따라 변경
          onPageChange={(newPage) => console.log(`Page changed to ${newPage}`)}
          headerText={letterData.headerText}
          letterCardType={letterData.letterCardType}
          letterCardColor={letterData.letterCardColor}
          letterCardState={letterData.letterCardState}
          letterCardMessage={letterData.letterCardMessage}
          letterCardClassName={letterData.letterCardClassName}
          centered={letterData.centered}
          textboxLabel={letterData.textboxLabel}
          largeButtonText={letterData.largeButtonText}
          smallButtonText={letterData.smallButtonText}
          showPrimaryButton={letterData.showPrimaryButton}
          customText={letterData.customText} // 커스텀 텍스트 속성 전달
          petName={letterData.petName}
          myName={letterData.myName}
          myMessage={letterData.myMessage}
          dateTime={letterData.dateTime}
        />
      </div>
    </div>
  );
};
