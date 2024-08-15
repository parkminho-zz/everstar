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
  const { quests, questAnswers, aiAnswers, diaries, sentimentAnalysis, pet } = data;
  const pages: PageType[] = [];
  console.log(data);

  // Add cover page
  pages.push({
    type: 'cover',
    src: avatarUrl
      ? `${avatarUrl}?timestamp=${Date.now()}`
      : `${pet.profileImageUrl}?timestamp=${Date.now()}`,
  });

  // Add sentiment analysis chart content page
  pages.push({
    type: 'chartContent',
    title: '감정 분석 총평',
    content: sentimentAnalysis.totalResult,
  });

  // Add sentiment analysis scores page
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
    type: 'chartScores',
    title: '감정 분석 결과',
    scores: sentimentResults,
  });

  // Add quest pages with AI answers
  quests.forEach((quest) => {
    const questAnswer = questAnswers.find((answer) => answer.questId === quest.id);
    const aiAnswer = aiAnswers.find((answer) => answer.questId === quest.id);

    const myImage = questAnswer?.imageUrl ? `${questAnswer.imageUrl}?timestamp=${Date.now()}` : '';
    const petImage = aiAnswer?.imageUrl ? `${aiAnswer.imageUrl}?timestamp=${Date.now()}` : '';
    const myAnswer = questAnswer?.content || '';
    const petAnswer = aiAnswer?.content || '';

    pages.push({
      type: 'question',
      question: `${quest.id}. ${quest.content}`, // Display quest ID with question
      myAnswer,
      petName: pet.name,
      petAnswer,
      myImage,
      petImage,
    });
  });

  // Add diary pages with the diary number and creation date
  diaries.forEach((diary, index) => {
    pages.push({
      type: 'diary',
      title: `${index + 1}번째 일기`,
      content: diary.content,
      imageUrl: diary.imageUrl ? `${diary.imageUrl}?timestamp=${Date.now()}` : '',
      createdTime: diary.createdTime, // Add createdTime
    });
    console.log(diaries);
  });

  return pages;
};

const loadImages = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  const promises = Array.from(images).map((img) => {
    return new Promise<void>((resolve) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`Failed to load image: ${img.src}`);
          resolve();
        };
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
          allowTaint: true,
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
