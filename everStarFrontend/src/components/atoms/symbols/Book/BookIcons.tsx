import React from 'react';
import { ReactComponent as BookIconDefault } from 'assets/symbols/book-default.svg';
import { ReactComponent as BookIconOpen } from 'assets/symbols/book-open.svg';

interface BookIconsProps {
  variant: 'book-close' | 'book-open';
  text?: string;
}

export const BookIcons: React.FC<BookIconsProps> = ({ variant }) => {
  return (
    <div>
      {variant === 'book-close' ? <BookIconDefault /> : <BookIconOpen />}
    </div>
  );
};

export type { BookIconsProps };
