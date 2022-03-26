import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, matchPath } from 'react-router-dom';
import LoadingBottom from '../../Components/LoadingBottom';
import LoadingTop from '../../Components/LoadingTop';
import './Home.css';

import '../../Utils/CommUtils';
import { COUNT_API_URL } from '../../Utils/CommUtils';

const Home = () => {
  const [loc, setLoc] = useState('');
  const [numbVisit, setNumbVisit] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [randomPick, setRandomPick] = useState({});

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
    axios.get(COUNT_API_URL).then((res) => {
      setNumbVisit(res.data.count);
    });
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition =
            position.coords.latitude + ' ' + position.coords.longitude;
          setTimeout(() => {
            setLoading(false);
          }, 1000);
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
        <section className='h-full bg-neutral-100 flex flex-col'>
          <LoadingTop />
          <LoadingBottom numbVisit={numbVisit} />
        </section>
      )}
      {!isLoading && (
        <section className='h-full flex flex-col bg-neutral-100 px-6'>
          <div className="basis-1/4 bg-[url('../public/img/top-bg1.png')] bg-cover flex justify-center items-center bg-center">
            <img className='w-40' src='img/sub-menu1.png' alt='picker 로고' />
          </div>
          <div className='basis-2/4'>
            <ul className='flex gap-3 h-full flex-wrap'>
              <li className=' bg-white flex-30 justify-center items-center flex rounded-lg'>
                <Link
                  to='/kr'
                  state={{ loc: loc, theme: '한식' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
                  <p className='text-4xl'>🍱</p>
                  한식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex rounded-lg'>
                <Link
                  to='/cn'
                  state={{ loc: loc, theme: '중식' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
                  <p className=' text-4xl'>🥡</p>
                  중식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex rounded-lg'>
                <Link
                  to='/jp'
                  state={{ loc: loc, theme: '일식' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
                  <p className=' text-4xl'>🍣</p>
                  일식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex rounded-lg'>
                <Link
                  to='/meat'
                  state={{ loc: loc, theme: '고기' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
                  <p className=' text-4xl'>🥩</p>
                  고기
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex rounded-lg'>
                <Link
                  to='/chicken'
                  state={{ loc: loc, theme: '치킨' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
                  <p className=' text-4xl'>🍗</p>
                  치킨
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex rounded-lg'>
                <Link
                  to='/pizza'
                  state={{ loc: loc, theme: '피자' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
                  <p className=' text-4xl'>🍕</p>
                  피자
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex rounded-lg'>
                <Link
                  to='/snack'
                  state={{ loc: loc, theme: '분식' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
                  <p className=' text-4xl'>🥟</p>
                  분식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex rounded-lg'>
                <Link
                  to='/midnightsnack'
                  state={{ loc: loc, theme: '야식' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
                  <p className=' text-4xl'>🍔</p>
                  야식
                </Link>
              </li>
              <li className=' bg-white flex-30 justify-center items-center flex'>
                <Link
                  to='/ramen'
                  state={{ loc: loc, theme: '라면' }}
                  className='w-full h-full flex justify-center items-center flex-col'
                >
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
              className='bg-picker-yellow p-5 mt-6 rounded-lg text-lg flex justify-center items-center w-full shadow-md'
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
