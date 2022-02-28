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
  const textArr = ['NOW', 'OUR', 'DO', 'START', 'YOUR'];
  const [text, setText] = useState(textArr[0]);
  let idx = 0;
  const getText = () => {
    if (idx === 5) {
      idx = 0;
    }
    setText(textArr[idx]);
    idx++;
  };

  useEffect(() => {
    setInterval(getText, 1000);
    if (!isLoading) {
      clearInterval(getText);
    }
  }, []);

  useEffect(() => {
    const listOfTheme = [
      { kr: '한식' },
      { jp: '일식' },
      { cn: '중식' },
      { meat: '고기' },
      { chicken: '치킨' },
      { pizza: '피자' },
      { snack: '분식' },
      { midnightsnack: '야식' },
      { ramen: '라면' },
    ];
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
          const currentPosition =
            position.coords.latitude + ' ' + position.coords.longitude;
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
        <section className='h-full bg-picker-orange flex flex-col'>
          {/* TOP */}
          <div className="basis-3/4 flex flex-col items-center justify-center bg-[url('../public/img/intro-circle.png')] bg-contain bg-bottom">
            <div className='basis-1/2 flex w-full justify-center items-end'>
              <p className='text-white text-5xl'>{text}</p>
            </div>
            <div className='basis-1/2'>
              <img className='w-44' src='img/logo-fff.png' alt='picker 로고' />
            </div>
          </div>

          {/* BOTTOM */}
          <div className='basis-1/4 text-xl tall:text-2xl pb-9'>
            <p className='text-white max-w-xs m-auto'>
              Picker가 <span className='font-extrabold'>{numbVisit}</span>명의
              고민을 해결해줬어요.
            </p>
            <p className='text-white'>
              원하는 고민거리를 <span className='font-extrabold'>Picker</span>{' '}
              해드릴게요!
            </p>
          </div>
        </section>
      )}
      {!isLoading && (
        <section className='h-full flex flex-col bg-neutral-100 px-6'>
          <div className="basis-1/4 bg-[url('../public/img/top-bg1.png')] bg-cover flex justify-center items-center bg-center">
            <img className='w-40' src='img/sub-menu1.png' alt='picker 로고' />
          </div>
          <div className='basis-2/4'>
            <ul className='flex gap-3 h-full flex-wrap'>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/kr' state={{ loc: loc, theme: '한식' }}>
                  <p className='text-4xl'>🍱</p>
                  한식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/cn' state={{ loc: loc, theme: '중식' }}>
                  <p className=' text-4xl'>🥡</p>
                  중식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/jp' state={{ loc: loc, theme: '일식' }}>
                  <p className=' text-4xl'>🍣</p>
                  일식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/meat' state={{ loc: loc, theme: '고기' }}>
                  <p className=' text-4xl'>🥩</p>
                  고기
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/chicken' state={{ loc: loc, theme: '치킨' }}>
                  <p className=' text-4xl'>🍗</p>
                  치킨
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/pizza' state={{ loc: loc, theme: '피자' }}>
                  <p className=' text-4xl'>🍕</p>
                  피자
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/snack' state={{ loc: loc, theme: '분식' }}>
                  <p className=' text-4xl'>🥟</p>
                  분식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/midnightsnack' state={{ loc: loc, theme: '야식' }}>
                  <p className=' text-4xl'>🍔</p>
                  야식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link to='/ramen' state={{ loc: loc, theme: '라면' }}>
                  <p className=' text-4xl'>🍜</p>
                  라면
                </Link>
              </li>
            </ul>
          </div>
          <div className='basis-1/4'>
            <Link
              to={`/${Object.keys(randomPick)[0]}`}
              state={{ loc: loc, theme: Object.values(randomPick)[0] }}
              className='bg-picker-yellow p-5 mt-6 rounded-lg text-lg flex justify-center items-center w-full'
            >
              메뉴 랜덤{' '}
              <span className="bg-[url('../public/img/logo-1E.png')] w-14 h-5 bg-contain bg-no-repeat align-top inline-block ml-1"></span>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
