import React, { useRef, useCallback, MutableRefObject } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { MemorialBookCover } from 'components/molecules/MemorialBook/MemorialBookCover/MemorialBookCover';
import { QuestionPage } from 'components/molecules/MemorialBook/QuestionPage/QuestionPage';
import { ImagePage } from 'components/molecules/MemorialBook/ImagePage/ImagePage';
import { WeatherPage } from 'components/molecules/MemorialBook/WeatherPage/WeatherPage';
import { EmotionPage } from 'components/molecules/MemorialBook/EmotionPage/EmotionPage';

// 페이지 컴포넌트 정의
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            {props.children}
        </div>
    );
});
Page.displayName = 'Page';

// 각 페이지 타입 정의
export type PageType = 
    | { type: 'cover' }
    | { type: 'question', question: string, description: string }
    | { type: 'imageQuestion', question: string, myImage: string, myAnswer: string, petImage: string, petAnswer: string }
    | { type: 'chart', weatherScores: number[], emotionData: number[] };

// MemorialBook 컴포넌트 정의
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
    width = 300, 
    height = 500, 
    minWidth = 200, 
    maxWidth = 800, 
    minHeight = 300, 
    maxHeight = 1000 
}) => {
    const bookRef = useRef<MutableRefObject<typeof HTMLFlipBook | null>>(null);

    const onFlip = useCallback((e: any) => {
        console.log('Current page: ' + e.data);
    }, []);

    const nextPage = () => {
        if (bookRef.current) {
            (bookRef.current as any).pageFlip().flipNext();
        }
    };

    return (
        <div>
            <button onClick={nextPage}>Next page</button>
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
                showCover={false}
                mobileScrollSupport={true}
                swipeDistance={30}
                clickEventForward={true}
                useMouseEvents={true}
                renderOnlyPageLengthChange={false}
                onFlip={onFlip}
                ref={bookRef as MutableRefObject<any>}
                className=""
                style={{}}
                startPage={0}
                showPageCorners={true}
                disableFlipByClick={false}
            >
                {pages.map((page, index) => {
                    switch (page.type) {
                        case 'cover':
                            return <Page key={index}><MemorialBookCover /></Page>;
                        case 'question':
                            return (
                                <Page key={index}>
                                    <QuestionPage title={page.question} description={page.description} />
                                </Page>
                            );
                        case 'imageQuestion':
                            return (
                                <Page key={index}>
                                    <ImagePage 
                                        question={page.question}
                                        myImage={page.myImage}
                                        myAnswer={page.myAnswer}
                                        petImage={page.petImage}
                                        petAnswer={page.petAnswer}
                                    />
                                </Page>
                            );
                        case 'chart':
                            return (
                                <Page key={index}>
                                    <div>
                                        <WeatherPage weatherScores={page.weatherScores} />
                                        <EmotionPage data={page.emotionData} />
                                    </div>
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
