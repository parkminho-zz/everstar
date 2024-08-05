import React from 'react';
import { InteractiveForm } from 'components/templates/InteractiveForm';

export const LetterWriteTemplate = () => {
  const currentPage = 1;
  const totalPages = 5;
  const onPageChange = (newPage: number) => {
    console.log('Page changed to:', newPage);
  };

  return (
    <div className='w-full h-full'>
      <InteractiveForm
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        headerText='Write Your Letter'
        letterCardType='default'
        letterCardColor='white'
        letterCardState='notReceived'
        letterCardMessage='Type your message here...'
        letterCardClassName='my-letter-card'
        centered={true}
        textboxLabel='Your Message'
        largeButtonText='이미지'
        smallButtonText='편지쓰기'
        showPrimaryButton={true}
        customText='Customize your message here'
        petName='Fluffy'
        myName='John Doe'
        myMessage='Hello there!'
        dateTime={new Date().toISOString()}
      />
    </div>
  );
};
