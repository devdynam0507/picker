import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MapContainer from '../../Components/MapContainer/MapConTainer';
import './Category.css';

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
    form.append('local', selected.address_name.split(' ')[0] + selected.address_name.split(' ')[1]);
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
      location: new kakao.maps.LatLng(curLoc.loc.split(' ')[0], curLoc.loc.split(' ')[1]),
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
      <section className='menu-section'>
        <div className='slot-container'>
          <div className='slot'>
            <ul className='menu-list' ref={slotRef}>
              {menus.map((el, i) => (
                <li key={i} className='menu-item'>
                  {rouletteMessage ? (
                    el.place_name
                  ) : (
                    <div className='food'>
                      <i className='fas fa-pizza-slice'></i>
                      <i className='fas fa-hamburger'></i>
                      <i className='fas fa-drumstick-bite'></i>
                      <i className='fas fa-utensils'></i>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='map-container'>
          <div className='map' ref={mapRef}>
            <MapContainer curLoc={curLoc} address={result.address_name} placename={result.place_name} />
          </div>
          <img ref={imgRef} src='/images/restaurant.png' alt='레스토랑' />
        </div>
        <div className='btn-container'>
          <span className='draw-in' ref={drawInRef}>
            내 주변의 {theme} 맛집 찾기
            <i className='far fa-hand-point-down'></i>
          </span>
          <button className='btn btn-picker' onClick={roll}>
            Picker
          </button>
          <button className='btn' onClick={navHandler}>
            카카오맵으로 길찾기
          </button>
        </div>
      </section>
    </main>
  );
};

export default Category;
