import React from 'react';

const Main = ({ theme }) => {
  const menu = {
    한식: {
      path: 'food/kr.png',
      info: '한식',
    },
    중식: {
      path: 'food/cn.png',
      info: '중식',
    },
    일식: {
      path: 'food/jp.png',
      info: '일식',
    },
    고기: {
      path: 'food/meat.png',
      info: '고기',
    },
    치킨: {
      path: 'food/chicken.png',
      info: '치킨',
    },
    피자: {
      path: 'food/pizza.png',
      info: '피자',
    },
    분식: {
      path: 'food/tteokbokki.png',
      info: '분식',
    },
    야식: {
      path: 'food/midnightsnack.png',
      info: '야식',
    },
    라면: {
      path: 'food/ramen.png',
      info: '라면',
    },
  };

  return (
    <div className='basis-2/4 bg-white rounded-lg flex justify-center items-center flex-col mb-6'>
      <img src={menu[theme].path} alt={menu[theme].info} />
      <div className='text-xl pb-3 animate-bounce'>
        <span className='text-picker-orange'>{theme}</span> 맛집을 찾으세요?
      </div>
    </div>
  );
};

export default Main;
