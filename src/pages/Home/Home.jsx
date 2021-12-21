import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [loc, setLoc] = useState('');
  const [numbVisit, setNumbVisit] = useState(0);
  const [curList, setCurList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://api.picker.run/count').then((res) => {
      setNumbVisit(res.data.count);
    });
    axios.get('http://api.picker.run/picker?amountOfData=6').then((res) => {
      console.log(res.data);
      setCurList(res.data);
    });
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition =
            position.coords.latitude + ' ' + position.coords.longitude;
          console.log(currentPosition);
          setLoading(false);
          setLoc(currentPosition);
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert('GPS를 허용해주세요');
    }
  };

  useEffect(() => getLocation(), []);

  return (
    <main>
      {/* <section class='notify-wrap'>
        <div class='notify-wrap-inner ellipsis'>
          <div class='notify-scroll'>
            <ul>
              <li>
                <div>공지사항1</div>
              </li>
              <li>
                <div>공지사항2</div>
              </li>
            </ul>
          </div>
        </div>
      </section> */}
      {isLoading && (
        <section className='loader-section'>
          <div className='loader'>
            <div className='upper ball'></div>
            <div className='right ball'></div>
            <div className='lower ball'></div>
            <div className='left ball'></div>
          </div>
          <p className='loader-text'>지도를 불러오는 중이에요..</p>
        </section>
      )}
      {!isLoading && (
        <div className='wapper'>
          {/* {curList.map((el) => el.local + '/' + el.food + ' ')} */}
          <h1 className='tit'>Picker</h1>
          <p className='txt'>Picker가 {numbVisit}명의 고민을 해결해줬어요.</p>
          <p className='txt'>원하는 고민거리를 Picker 해드릴게요.</p>
          <p className='nemu'>메뉴 Picker</p>
          <ul className='inner'>
            <li className='item'>
              <Link to='/kr' state={{ loc: loc, theme: '한식' }}>
                한식
              </Link>
            </li>
            <li className='item'>
              <Link to='/jp' state={{ loc: loc, theme: '일식' }}>
                일식
              </Link>
            </li>
            <li className='item'>
              <Link to='/cn' state={{ loc: loc, theme: '중식' }}>
                중식
              </Link>
            </li>
          </ul>
          <ul className='inner'>
            <li className='item'>
              <Link to='/meat' state={{ loc: loc, theme: '고기' }}>
                고기
              </Link>
            </li>
            <li className='item'>
              <Link to='/chicken' state={{ loc: loc, theme: '치킨' }}>
                치킨
              </Link>
            </li>
            <li className='item'>
              <Link to='/pizza' state={{ loc: loc, theme: '피자' }}>
                피자
              </Link>
            </li>
          </ul>
          <ul className='inner'>
            <li className='item'>
              <Link to='/snack' state={{ loc: loc, theme: '분식' }}>
                분식
              </Link>
            </li>
            <li className='item'>
              <Link to='/midnightsnack' state={{ loc: loc, theme: '야식' }}>
                야식
              </Link>
            </li>
            <li className='item'>
              <Link to='/ramen' state={{ loc: loc, theme: '라면' }}>
                라면
              </Link>
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default Home;
