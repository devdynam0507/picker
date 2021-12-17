import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <main>
      <div className='wapper'>
        <h1 className='tit'>Picker</h1>
        <p className='txt'>원하는 고민거리를 Picker 해드릴게요.</p>
        <p className='nemu'>메뉴 Picker</p>
        <ul className='inner'>
          <li className='item'>
            <Link to='/kr'>한식</Link>
          </li>
          <li className='item'>
            <Link to='/jp'>일식</Link>
          </li>
          <li className='item'>
            <Link to='/cn'>중식</Link>
          </li>
        </ul>
        <ul className='inner'>
          <li className='item'>
            <Link to='/meat'>고기</Link>
          </li>
          <li className='item'>
            <Link to='/chicken'>치킨</Link>
          </li>
          <li className='item'>
            <Link to='/ramen'>라면</Link>
          </li>
        </ul>
        <ul className='inner'>
          <li className='item'>
            <Link to='/snack'>분식/야식</Link>
          </li>
          <li className='item'>
            <Link to='/etc'>기타</Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Home;