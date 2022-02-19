import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, matchPath } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [loc, setLoc] = useState('');
  const [numbVisit, setNumbVisit] = useState(0);
  const [curList, setCurList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [randomPick, setRandomPick] = useState({});

  useEffect(() => {
    const listOfTheme = [{ kr: '한식' }, { jp: '일식' }, { cn: '중식' }, { meat: '고기' }, { chicken: '치킨' }, { pizza: '피자' }, { snack: '분식' }, { midnightsnack: '야식' }, { ramen: '라면' }];
    setRandomPick(listOfTheme[Math.floor(Math.random() * 9)]);
  }, []);

  useEffect(() => {
    axios.get('http://api.picker.run/count').then((res) => {
      setNumbVisit(res.data.count);
    });
    axios.get('http://api.picker.run/picker?amountOfData=6').then((res) => {
      // console.log(res.data);
      setCurList(res.data);
    });
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = position.coords.latitude + ' ' + position.coords.longitude;
          // console.log(currentPosition);
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
        <div className='wrapper'>
          <img className='home-bg' src='images/picker.png' alt='타코, 햄버거, 도넛' />
          <p className='txt'>
            Picker가 <span>{numbVisit}</span>명의 고민을 해결해줬어요.
          </p>
          <p className='txt'>
            원하는 고민거리를 <strong>Picker</strong> 해드릴게요.
          </p>
          <p className='menu'>
            <Link to={`/${Object.keys(randomPick)[0]}`} state={{ loc: loc, theme: Object.values(randomPick)[0] }}>
              랜덤 메뉴 Pick
            </Link>
          </p>
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
