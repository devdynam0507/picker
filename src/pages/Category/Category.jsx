import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Map from '../../Components/Map';
import './Category.css';
import Main from '../../Components/Main';
import Button from '../../Components/Button';

const { kakao } = window;
const Category = () => {
  const [menus, setMenus] = useState([]);
  const location = useLocation();
  const [random, setRandom] = useState(undefined);
  const curLoc = location.state.loc;
  const theme = location.state.theme;

  // kakao map api 구현
  const places = new kakao.maps.services.Places();
  const callback = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setMenus(result);
    }
  };

  useEffect(() => {
    if (!curLoc) {
      alert('위치정보를 다시 받아와주세요');
      window.location.assign('/');
    }
    places.keywordSearch(theme, callback, {
      location: new kakao.maps.LatLng(
        curLoc.split(' ')[0],
        curLoc.split(' ')[1]
      ),
      page: 1,
    });
  }, [curLoc, theme, places]);

  const navHandler = () => {
    window.location.assign(`https://map.kakao.com/link/to/${menus[random].id}`);
  };

  function onPicker() {
    const min = 0;
    const max = 15;
    const num = Math.floor(Math.random() * (max - min + 1) + min);

    return setRandom(num);
  }

  return (
    <main>
      <section className='h-full flex flex-col bg-neutral-100 px-6'>
        <div className="basis-1/4 bg-[url('../public/img/top-bg1.png')] bg-cover flex justify-center items-center bg-center">
          <img className='w-40' src='img/sub-menu2.png' alt='picker 로고' />
        </div>
        {random ? (
          <Map
            curLoc={curLoc}
            address={menus[random]?.address_name}
            placeName={menus[random]?.place_name}
          />
        ) : (
          <Main theme={theme} />
        )}
        <div className='basis-1/4'>
          <Button
            text={`내 주변 ${theme}집 찾기`}
            onClick={onPicker}
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
