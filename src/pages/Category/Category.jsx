import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Map from '../../Components/Map';
import './Category.css';
import Main from '../../Components/Main';
import Button from '../../Components/Button';

const { kakao } = window;
const Category = (props) => {
  const [menus, setMenus] = useState([]);
  const [slot, setSlot] = useState({ ...menus, rolling: false });
  const location = useLocation();
  const slotRef = useRef();
  const mapRef = useRef();
  const imgRef = useRef();
  const drawInRef = useRef();
  const [curLoc, setCurLoc] = useState(location.state);
  const [result, setResult] = useState('');
  const [rouletteMessage, setRouletteMessage] = useState(0);
  const rouletteHandler = () => {
    setRouletteMessage(1);
  };
  const theme = curLoc.theme;

  const roll = () => {
    rouletteHandler();
    setSlot({ rolling: true });

    setTimeout(() => {
      setSlot({ rolling: false });
    }, 1000);

    mapRef.current.classList.add('show');
    imgRef.current.classList.add('hide');
    drawInRef.current.classList.add('none');

    const selected = triggerSlotRotation(slotRef.current);
    setSlot({ [0]: selected });
    setResult(selected);
    // console.log(selected);
    const form = new FormData();
    form.append(
      'local',
      selected.address_name.split(' ')[0] + selected.address_name.split(' ')[1]
    );
    form.append('food', selected.category_name.split('> ').reverse()[0]);

    axios
      .post('http://api.picker.run/picker', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const triggerSlotRotation = (ref) => {
    const setTop = (top) => {
      ref.style.top = `${top}px`;
    };
    let options = ref.children;
    let randomOption = Math.floor(Math.random() * menus.length);
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
    return menus[randomOption];
  };

  // kakao map api 구현
  const places = new kakao.maps.services.Places();
  const callback = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setMenus(result);
    }
  };
  useEffect(() => {
    // console.log(location.state.loc);
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

  const navHandler = () => {
    if (rouletteMessage) {
      window.location.assign(`https://map.kakao.com/link/to/${result.id}`);
    } else {
      alert('룰렛을 먼저 돌려주세요.');
    }
  };

  return (
    <main>
      <section className='h-full flex flex-col bg-neutral-100 px-6'>
        <div className="basis-1/4 bg-[url('../public/img/top-bg1.png')] bg-cover flex justify-center items-center bg-center">
          <img className='w-40' src='img/sub-menu2.png' alt='picker 로고' />
        </div>
        <Main theme={theme} />
        <div className='basis-1/4'>
          <Button
            text={`내 주변 ${theme}집 찾기`}
            onClick={navHandler}
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
