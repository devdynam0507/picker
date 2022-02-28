import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Map from '../../Components/Map';
import './Category.css';
import Main from '../../Components/Main';
import Button from '../../Components/Button';

const { kakao } = window;
const Category = () => {
  const [menus, setMenus] = useState([]);
  const location = useLocation();
  const [curLoc, setCurLoc] = useState(location.state);
  const [result, setResult] = useState(false);
  const theme = curLoc.theme;

  // kakao map api 구현
  const places = new kakao.maps.services.Places();
  const callback = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setMenus(result);
    }
  };
  // console.log(menus[0].address_name);
  // console.log(curLoc);
  useEffect(() => {
    if (!location.state.loc) {
      alert('위치정보를 다시 받아와주세요');
      window.location.assign('/');
    }
    places.keywordSearch(location.state.theme, callback, {
      location: new kakao.maps.LatLng(
        curLoc.loc.split(' ')[0],
        curLoc.loc.split(' ')[1]
      ),
      page: 1,
    });
  }, []);
  console.log(curLoc);
  const navHandler = () => {
    window.location.assign(`https://map.kakao.com/link/to/${menus[0].id}`);
  };

  return (
    <main>
      <section className='h-full flex flex-col bg-neutral-100 px-6'>
        <div className="basis-1/4 bg-[url('../public/img/top-bg1.png')] bg-cover flex justify-center items-center bg-center">
          <img className='w-40' src='img/sub-menu2.png' alt='picker 로고' />
        </div>
        {result ? (
          <Map
            curLoc={curLoc}
            address={menus[0].address_name}
            placeName={menus[0].place_name}
          />
        ) : (
          <Main theme={theme} />
        )}
        <div className='basis-1/4'>
          <Button
            text={`내 주변 ${theme}집 찾기`}
            onClick={() => {
              setResult(true);
            }}
            isImg={true}
          />
          <Button text='카카오맵으로 길 찾기' onClick={navHandler} />
          <Button
            text='메뉴 다시 고르기'
            onClick={() => window.location.assign('/')}
          />
        </div>
      </section>
    </main>
  );
};

export default Category;
