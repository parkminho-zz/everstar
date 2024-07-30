import React, { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { MemorialBook, PageType } from 'components/organics/MemorialBook/MemorialBook';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import bgImage from 'assets/images/bg-everstar.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const questionsAndAnswers: PageType[] = [
  { type: 'cover' },
  {
    type: 'chart',
    title: '평가 결과',
    content: '굉장히 많이 호전되었어요.',
    scores: [10, 30, 50, 70, 90, 60, 40],
  },
  {
    type: 'question',
    question: '강아지와 행복했던 순간을 말해주세요.',
    myAnswer: '나의 답변 내용입니다.',
    petName: '반려동물',
    petAnswer: '반려동물의 답변 내용입니다.',
  },
  {
    type: 'imageQuestion',
    question: '그린 그림을 공유해주세요',
    petName: '반려동물',
    myImage: 'https://via.placeholder.com/180x135',
    myAnswer: '이것은 나의 그림입니다.',
    petImage: 'https://via.placeholder.com/180x135',
    petAnswer: '이것은 반려동물의 그림입니다.',
  },
];

export const MemorialBookPage: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const headerType = isMobile
    ? 'mobile-everstar'
    : isTabletOrMobile
      ? 'tablet-everstar'
      : 'everstar';

  const footerType = isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop';

  const memorialBookRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (memorialBookRef.current) {
      const book = memorialBookRef.current.querySelectorAll('.demoPage');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      for (let i = 0; i < book.length; i++) {
        const page = book[i] as HTMLElement;
        // 페이지가 눈에 보이도록 스타일 수정
        page.style.display = 'block';
        const canvas = await html2canvas(page, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        if (i < book.length - 1) {
          pdf.addPage();
        }
        // 페이지를 다시 보이지 않도록 스타일 수정
        page.style.display = 'none';
      }
      pdf.save('memorial-book.pdf');
    }
  };

  const handleWriteDiary = () => {
    // 일기 작성 로직 구현
    console.log('일기 작성');
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header type={headerType} className="sticky top-0 z-50" />
      <div className="my-4" ref={memorialBookRef}>
        <MemorialBook pages={questionsAndAnswers} />
      </div>
      <div className="flex justify-center my-4 space-x-4">
        <PrimaryButton
          theme="white"
          size="medium"
          onClick={handleDownloadPdf}
          disabled={false}
          icon={null}
        >
          PDF로 만들기
        </PrimaryButton>
        <PrimaryButton
          theme="white"
          size="medium"
          onClick={handleWriteDiary}
          disabled={false}
          icon={null}
        >
          일기 작성
        </PrimaryButton>
      </div>
      <Footer type={footerType} className="mt-auto" />
    </div>
  );
};
