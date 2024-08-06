import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EverStarMain } from 'components/templates/EverStarMain';
import { EverStarCheerMessage } from 'components/templates/EverStarCheerMessage';
import { EverStarSearchStar } from 'components/templates/EverStarSearchStar';
export const EverstarPage: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Routes>
          <Route
            path='/'
            element={
              <EverStarMain
                title='지구별'
                fill={49}
                buttonSize='large'
                buttonDisabled={false}
                buttonText='지구별로 이동'
                onButtonClick={() => console.log('영원별 이동')}
                buttonTheme={'white'}
              />
            }
          />
          <Route
            path='message'
            element={
              <EverStarCheerMessage
                profile={{
                  name: '홍길동',
                  age: 5,
                  date: '2023-07-25',
                  description: '사랑스러운 반려동물입니다.',
                  tagList: ['#쾌활한'],
                  avatarUrl: '',
                }}
                postItCards={[]}
                totalPages={0}
              />
            }
          />

          <Route path='explore' element={<EverStarSearchStar />} />
        </Routes>
      </div>
    </div>
  );
};
