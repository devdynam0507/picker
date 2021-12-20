import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const { category } = useParams();
  const menu = {
    kr: [
      '닭볶음탕',
      '설렁탕',
      '냉면',
      '간장게장',
      '낙지',
      '불고기백반',
      '곱창',
      '김치찌개',
    ],
    jp: [
      '초밥',
      '돈부리',
      '참치회',
      '소바',
      '라멘',
      '장어덮밥',
      '우동',
      '오코노미야끼',
    ],
    cn: [
      '탕수육',
      '깐풍기',
      '칠리새우',
      '짬뽕',
      '짜장면',
      '유린기',
      '찹쌀 탕수육',
      '사천 탕수육',
      '딤섬',
    ],
    ramen: [
      '신라면',
      '너구리',
      '팔도 비빔면',
      '불닭 볶음면',
      '안성탕면',
      '진라면',
      '삼양라면',
      '짜왕',
    ],
    chicken: [
      'BHC 뿌링클',
      'BBQ 후라이드',
      '네네치킨 파닭',
      '자담치킨 맵슐랭',
      '60계치킨 호랑이',
      '네네치킨 스노윙',
      '파파이스',
      'KFC',
      '교촌치킨',
    ],
    meat: [
      '가브리살',
      '살치살',
      '갈매기살',
      '목살',
      '안심',
      '등심',
      '항정살',
      '삼겹살',
    ],
    snack: [
      '떡볶이',
      '순대',
      '빙수',
      '어묵',
      '케이크',
      '빵',
      '푸딩',
      '보쌈',
      '족발',
      '튀김',
    ],
    etc: [
      '햄버거',
      '스테이크',
      '파스타',
      '훈제오리',
      '베트남 쌀국수',
      '만두',
      '카레',
      '피자',
      '나시고랭',
    ],
  };
  const [slot, setSlot] = useState({ ...menu[category], rolling: false });
  const slotRef = useRef();
  const menuList = {
    menu: menu[category],
  };
  // console.log(slot);

  const roll = () => {
    setSlot({ rolling: true });

    setTimeout(() => {
      setSlot({ rolling: false });
    }, 1000);

    const selected = triggerSlotRotation(slotRef.current);
    setSlot({ [0]: selected });
  };

  const triggerSlotRotation = (ref) => {
    const setTop = (top) => {
      ref.style.top = `${top}px`;
    };
    let options = ref.children;
    let randomOption = Math.floor(Math.random() * menuList.menu.length);
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
    console.log(randomOption);
    return menuList.menu[randomOption];
  };

  return (
    <main>
      <section className='menu-section'>
        <div className='slot-container'>
          <div className='slot'>
            <ul className='menu-list' ref={slotRef}>
              {menuList.menu.map((item, i) => (
                <li key={i} className='menu-item'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='btn-container'>
          <button className='btn btn-picker' onClick={roll}>
            Picker
          </button>
          <button className='btn'>다시 고를래요</button>
        </div>
      </section>
    </main>
  );
};

export default Category;