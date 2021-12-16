import React from 'react';
import Button from './Botton';

const menu = {
  'country1': [
    {id: 0, name: '한식'},
    {id: 1, name: '일식'},
    {id: 2, name: '중식'}
  ],
  'country2': [
    {id: 3, name: '고기'},
    {id: 4, name: '치킨'},
    {id: 5, name: '라면'}
  ],
  'country3': [
    {id: 6, name: '분식'},
    {id: 7, name: '야식'},
    {id: 8, name: '기타'}
  ]
}

const Home = () => {
  return (
    <main>
      <div className='wapper'>
        <h1 className='tit'>Picker</h1>
        <p className='txt'>원하는 고민거리를 Picker 해드릴게요.</p>
        <p className='nemu'>메뉴 Picker</p>
        <div className='inner'>
          <div className='flex'>
            {menu.country1.map((item, i) => (
              <Button key={i} name={item.name} idx={i} />
            ))}
          </div>
          <div className='flex'>
            {menu.country2.map((item, i) => (
              <Button key={i} name={item.name} idx={i} />
            ))}
          </div>
          <div className='flex'>
            {menu.country3.map((item, i) => (
              <Button key={i} name={item.name} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
