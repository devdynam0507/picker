import React from 'react';

const LoadingTop = () => {
  return (
    <div className="basis-3/4 flex flex-col items-center justify-center bg-[url('../public/img/intro-circle.png')] bg-contain bg-bottom">
      <div className='flex w-full justify-center items-end mb-2'>
        <ul className='text-black text-5xl h-[2.5rem] overflow-hidden'>
          <li className='relative top-0 animate-slide h-[2.5rem]'>
            <span>NOW</span>
          </li>
          <li className='relative top-0 animate-slide h-[2.5rem]'>
            <span>OUR</span>
          </li>
          <li className='relative top-0 animate-slide h-[2.5rem]'>
            <span>DO</span>
          </li>
          <li className='relative top-0 animate-slide h-[2.5rem]'>
            <span>START</span>
          </li>
          <li className='relative top-0 animate-slide h-[2.5rem]'>
            <span>YOUR</span>
          </li>
        </ul>
      </div>
      <div>
        <img className='w-44' src='img/logo-1E.png' alt='picker 로고' />
      </div>
      <p className='pt-4 text-lg'>주변 맛집을 찾고 있어요!</p>
    </div>
  );
};

export default LoadingTop;
