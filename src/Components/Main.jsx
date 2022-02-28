import React from 'react';

const Main = ({ theme }) => {
  const menu = {
    한식: '🍱',
    중식: '🥡',
    일식: '🍣',
    고기: '🥩',
    치킨: '🍗',
    피자: '🍕',
    분식: '🥟',
    야식: '🍔',
    라면: '🍜',
  };

  return (
    <div className='basis-2/4 bg-white rounded-full flex justify-center items-center flex-col mb-6'>
      <p className='text-9xl'>{menu[theme]}</p>
      <div className='text-xl mt-3'>
        <span className='text-picker-orange'>{theme}</span> 맛집을 찾으세요?
      </div>
    </div>
  );
};

export default Main;
