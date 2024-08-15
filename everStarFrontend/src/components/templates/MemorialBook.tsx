import React, { useRef, useState, useEffect } from 'react';
import {
  MemorialBook as OrganicsMemorialBook,
  PageType,
} from 'components/organics/MemorialBook/MemorialBook';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MemorialBookDetailsResponse } from 'api/memorialBookApi';
import { useFetchMemorialBookById } from 'hooks/useMemorialBooks';
import { useParams } from 'react-router-dom';
import { MemorialBookDiaryModal } from 'components/organics/MemorialBook/MemorialBookDiaryModal';
import bgImage from 'assets/images/bg-login.webp';
import { SplashTemplate } from './SplashTemplate';

const parseMemorialBookData = (
  data: MemorialBookDetailsResponse,
  avatarUrl: string | undefined,
): PageType[] => {
  console.log(data);
  const { quests, questAnswers, aiAnswers, diaries, sentimentAnalysis, pet } = data;
  const pages: PageType[] = [];

  // 커버 페이지 추가
  pages.push({
    type: 'cover',
    src: avatarUrl || pet.profileImageUrl,
  });

  // 감정 분석 차트 페이지 추가
  const sentimentResults = [
    sentimentAnalysis.week1Result,
    sentimentAnalysis.week2Result,
    sentimentAnalysis.week3Result,
    sentimentAnalysis.week4Result,
    sentimentAnalysis.week5Result,
    sentimentAnalysis.week6Result,
    sentimentAnalysis.week7Result,
  ];

  pages.push({
    type: 'chart',
    title: '감정 분석',
    content: sentimentAnalysis.totalResult,
    scores: sentimentResults,
  });

  // 퀘스트와 AI 답변을 포함한 페이지 추가
  quests.forEach((quest) => {
    const questAnswer = questAnswers.find((answer) => answer.questId === quest.id);
    const aiAnswer = aiAnswers.find((answer) => answer.questId === quest.id);

    if (quest.type === 'TEXT') {
      pages.push({
        type: 'question',
        question: quest.content,
        myAnswer: questAnswer?.content || '',
        petName: pet.name,
        petAnswer: aiAnswer?.content || '',
      });
    } else if (quest.type === 'TEXT_IMAGE' || quest.type === 'WEBRTC') {
      pages.push({
        type: 'imageQuestion',
        question: quest.content,
        petName: pet.name,
        myImage: questAnswer?.imageUrl || '',
        myAnswer: questAnswer?.content || '',
        petImage: aiAnswer?.imageUrl || '',
        petAnswer: aiAnswer?.content || '',
      });
    }
  });

  // 다이어리 페이지 추가
  diaries.forEach((diary) => {
    pages.push({
      type: 'diary',
      title: diary.title,
      content: diary.content,
      imageUrl: diary.imageUrl || '',
    });
  });

  return pages;
};

const loadImages = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  const promises = Array.from(images).map((img) => {
    return new Promise<void>((resolve, reject) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => reject();
      }
    });
  });
  return Promise.all(promises);
};

export const MemorialBook: React.FC<{ avatarUrl?: string; isOwner?: boolean }> = ({
  avatarUrl,
  isOwner,
}) => {
  const params = useParams<{ pet?: string; memorialBookId?: string }>();
  const petId = params.pet ? parseInt(params.pet, 10) : 0;
  const memorialBookId = params.memorialBookId ? parseInt(params.memorialBookId, 10) : 0;

  const memorialBookRef = useRef<HTMLDivElement>(null);

  const {
    data: memorialBookDetails,
    isLoading,
    refetch,
  } = useFetchMemorialBookById(petId, memorialBookId);

  const [pages, setPages] = useState<PageType[]>([]);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isDiaryUpdated, setIsDiaryUpdated] = useState(false);

  useEffect(() => {
    if (memorialBookDetails) {
      const parsedPages = parseMemorialBookData(memorialBookDetails.data, avatarUrl);
      setPages(parsedPages);
    }
  }, [memorialBookDetails, avatarUrl]);

  useEffect(() => {
    if (isDiaryUpdated) {
      refetch();
      alert('저장이 완료되었어요.');
      setIsDiaryUpdated(false);
    }
  }, [isDiaryUpdated, refetch]);

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
        await loadImages(page);
        page.style.display = 'block';

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: true,
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        if (i < book.length - 1) {
          pdf.addPage();
        }
        page.style.display = 'none';
      }

      pdf.save('memorial-book.pdf');
    }
  };

  const handleWriteDiary = () => {
    setIsDiaryModalOpen(true);
  };

  const handleCloseDiaryModal = () => {
    setIsDiaryModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="relative flex flex-col items-start min-h-screen bg-center bg-cover z-[-1]">
        <img
          src={bgImage}
          alt="Background"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <SplashTemplate type="book" className="z-10 w-full h-full " />
      </div>
    );
  }

  return (
    <div>
      <div className="relative z-10 my-4" ref={memorialBookRef}>
        <OrganicsMemorialBook pages={pages} />
      </div>
      <div className="relative z-10 flex justify-center m-4 space-x-4">
        {isOwner && (
          <>
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
              일기쓰기
            </PrimaryButton>
          </>
        )}
      </div>

      <MemorialBookDiaryModal
        isOpen={isDiaryModalOpen}
        onClose={handleCloseDiaryModal}
        onSuccess={() => setIsDiaryUpdated(true)}
      />
    </div>
  );
};
