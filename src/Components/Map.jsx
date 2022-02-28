import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = ({ curLoc, address, placeName }) => {
  useEffect(() => {
    console.log(`맵로그: ${curLoc.loc}, ${address}, ${placeName}`);
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(
        curLoc.loc.split(' ')[0],
        curLoc.loc.split(' ')[1]
      ),
      level: 3,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다..
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      function setDraggable(draggable) {
        // 마우스 드래그로 지도 이동 가능여부를 설정합니다
        map.setDraggable(draggable);
      }
      function setZoomable(zoomable) {
        // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
        map.setZoomable(zoomable);
      }
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="font-size:20px;width:200px;text-align:center;padding:10px 0;">${placeName}</div>`,
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
        setDraggable();
        setZoomable();
      }
    });
  }, [placeName]);

  return <div id='myMap' className='w-96 h-96 my-6'></div>;
};

export default MapContainer;
