import React, { useRef, useCallback, MutableRefObject } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { MemorialBookCover } from 'components/molecules/MemorialBook/MemorialBookCover/MemorialBookCover';
import { QuestionPage } from 'components/molecules/MemorialBook/QuestionPage/QuestionPage';
import { ImagePage } from 'components/molecules/MemorialBook/ImagePage/ImagePage';
import { ChartPage } from 'components/molecules/MemorialBook/ChartPage/ChartPage';
import { DiaryPage } from 'components/molecules/MemorialBook/DiaryPage/DiaryPage';

// Define the Page component
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; pageIndex: number }>(
  (props, ref) => {
    return (
      <div className="demoPage h-[508px] w-[360px] bg-white" ref={ref}>
        {props.children}
        <div className="absolute text-xs text-gray-500 bottom-2 right-2">{props.pageIndex + 1}</div>
      </div>
    );
  },
);
Page.displayName = 'Page';

// Define the PageType types
export type PageType =
  | { type: 'cover'; src?: string }
  | {
      type: 'question';
      question: string;
      myAnswer: string;
      petName: string;
      petAnswer: string;
      myImage?: string; // myImage field added
      petImage?: string; // petImage field added
    }
  | {
      type: 'imageQuestion';
      question: string;
      petName: string;
      myImage: string;
      myAnswer: string;
      petImage: string;
      petAnswer: string;
    }
  | { type: 'chart'; title: string; content: string; scores: number[] }
  | { type: 'diary'; title: string; content: string; imageUrl?: string; createdTime?: string };

// Define the MemorialBook component
export interface MemorialBookProps {
  pages: PageType[];
  width?: number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export const MemorialBook: React.FC<MemorialBookProps> = ({
  pages,
  width = 360,
  height = 508,
  minWidth = 360,
  maxWidth = 360,
  minHeight = 508,
  maxHeight = 508,
}) => {
  const bookRef = useRef<MutableRefObject<typeof HTMLFlipBook | null>>(null);

  const onFlip = useCallback((e: { data: number }) => {
    console.log('Current page: ' + e.data);
  }, []);

  return (
    <div className="flex justify-center">
      <HTMLFlipBook
        width={width}
        height={height}
        size="fixed"
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={1}
        showCover={true}
        mobileScrollSupport={true}
        swipeDistance={30}
        clickEventForward={true}
        useMouseEvents={true}
        renderOnlyPageLengthChange={false}
        onFlip={onFlip}
        ref={bookRef as MutableRefObject<typeof HTMLFlipBook | null>}
        className=""
        style={{}}
        startPage={0}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {pages.map((page, index) => {
          switch (page.type) {
            case 'cover':
              return (
                <Page key={index} pageIndex={index}>
                  <MemorialBookCover src={page.src} />
                </Page>
              );
            case 'question':
              return (
                <Page key={index} pageIndex={index}>
                  <QuestionPage
                    title={page.question}
                    myAnswer={page.myAnswer}
                    petName={page.petName}
                    petAnswer={page.petAnswer}
                    myImage={page.myImage} // User image
                    petImage={page.petImage} // AI image
                  />
                </Page>
              );
            case 'imageQuestion':
              return (
                <Page key={index} pageIndex={index}>
                  <ImagePage
                    question={page.question}
                    petName={page.petName}
                    myImage={page.myImage}
                    myAnswer={page.myAnswer}
                    petImage={page.petImage}
                    petAnswer={page.petAnswer}
                  />
                </Page>
              );
            case 'chart':
              return (
                <Page key={index} pageIndex={index}>
                  <ChartPage title={page.title} content={page.content} scores={page.scores} />
                </Page>
              );
            case 'diary':
              return (
                <Page key={index} pageIndex={index}>
                  <DiaryPage
                    title={page.title}
                    content={page.content}
                    imageUrl={page.imageUrl}
                    createdTime={page.createdTime}
                  />
                </Page>
              );
            default:
              return null;
          }
        })}
      </HTMLFlipBook>
    </div>
  );
};
