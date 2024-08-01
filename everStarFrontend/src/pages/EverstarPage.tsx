import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MemorialBook } from 'components/templates/MemorialBook';
import { Header } from 'components/molecules/Header/Header';
export const EverstarPage = () => {
  return (
    <div>
      <Header type='everstar' />
      <h1>EverstarPage</h1>
      <Routes>
        <Route path=':userid/memorial' element={<MemorialBook />} />
      </Routes>
    </div>
  );
};
