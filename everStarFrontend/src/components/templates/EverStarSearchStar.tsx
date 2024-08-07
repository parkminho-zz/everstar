import React from 'react';
import { SearchStar } from 'components/organics/searchStar/SearchStar';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import bgImage from 'assets/images/bg-everstar.webp';

interface EverStarSearchStarProps {}

export const EverStarSearchStar: React.FC<EverStarSearchStarProps> = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header type="everstar" className="sticky top-0 z-50" /> <SearchStar />
      <Footer className="mt-auto" />
    </div>
  );
};

export type { EverStarSearchStarProps };
