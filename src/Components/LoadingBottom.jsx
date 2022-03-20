import React from 'react';

const LoadingBottom = ({ numbVisit }) => {
  return (
    <div className='basis-1/4 text-xl tall:text-2xl pb-9'>
      <p className='text-black max-w-xs m-auto'>
        Picker가 <span className='font-extrabold'>{numbVisit}</span>명의 고민을
        해결해줬어요.
      </p>
      <p className='text-black'>
        원하는 고민거리를 <span className='font-extrabold'>Picker</span>{' '}
        해드릴게요!
      </p>
    </div>
  );
};

export default LoadingBottom;
