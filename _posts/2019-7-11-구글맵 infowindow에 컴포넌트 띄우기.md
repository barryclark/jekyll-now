---
layout: post
title: 구글맵 infowindow에 컴포넌트 띄우기
date: 2019-07-11
comments: true
categories: [Study, react]
tags: [React, Google Maps API, InfoWindow]
excerpt: 구글맵에서 마커를 클릭했을 때, 팝업창을 띄워 위치 정보를 게시하고 싶다면 Maps JavaScript API에서 제공하는 Info Windows를 사용할 수 있다.
---

구글맵에서 마커를 클릭했을 때, 팝업창을 띄워 위치 정보를 게시하고 싶다면 Maps JavaScript API에서 제공하는 [Info Windows](https://developers.google.com/maps/documentation/javascript/infowindows)를 사용할 수 있다.

### 구글맵 연동

[리액트에서 구글맵 연동하기](/study/react/리액트에서-구글맵-연동하기/)에서 구현한 코드를 사용하여 맵을 로딩하고, 여기에 InfoWindow 컴포넌트를 추가해 보겠다.

```react
{%raw%}// App.js

import React, { Component } from 'react';
import Map from './Map';

const App = () => {

render() {
    return (
      <Map
        id="myMap"
        options={{
          center: { lat: 33.4890, lng: 126.4983 },
          zoom: 15
        }}
        onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { lat: 33.4890, lng: 126.4983 },,
            map: map
          });
        }}
      />
    );
  }
}
export default App;
{%endraw%}
```

### marker에 클릭함수 추가하기

`onMapLoad` 함수에서 생성한 `marker`에 마커를 클릭했을 때 `createInfoWindow()` 함수를 실행하여 infowindow를 띄워줄 수 있도록 `addListener`를 추가해 준다. `addListener`는 Maps JavaScript API에서 제공하는 메서드로, 이외에도 마우스 이벤트 등이 있다.

```react
onMapLoad = (map) => {
    var marker = new window.google.maps.Marker({
        position: { lat: 33.4890, lng: 126.4983 },,
        map: map
        });
    }
    marker.addListener('click', e => {
        this.createInfoWindow(e, map);
    });
}
```

### createInfoWindow 함수 정의하기

이제 실질적인 `createInfoWindow` 함수를 정의해 주어야 하는데, `new google.maps.InfoWindow()`에 `content` 옵션에 infowindow에 나타내어질 내용을 정의해주면 되는데 html 형식으로 작성해야 한다. 때문에, `content` 옵션에 특정 id를 가진 `div` 태그를 작성하고, 그 `div`에 접근하여 원하는 컴포넌트를 `react-dom`의 `render` 함수를 사용하여 렌더해주면 된다.

```react
createInfoWindow = (e, map) => {
   const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    });
    infoWindow.addListener('domready', () => {
      render(
          <InfoWindow />
        document.getElementById('infoWindow')
      );
    });

    infoWindow.open(map);
}
```

여기까지 하면, 마커 클릭 시, `<InfoWindow />` 에 정의해주는 내용이 지도 내 마커 위치에서 말풍선 처럼 뜨게 될 것이다.

---

추가적으로, 마커 클릭 시,`placeId`를 사용하여 placeDetail 정보를 받아 InfoWindow 컴포넌트 내에 렌더하는 방법을 알아보자. 이 부분은 JavaScript API Places Library의 [Place Details Requests](https://developers.google.com/maps/documentation/javascript/places#place_details)를 참고하면 된다.

### placeDetail 요청하기

placeDetail은 아래와 같은 형태로 요청할 수 있으며, `request`에 필수적으로 `placeId`를 제공해야 한다.

```react
service = new google.maps.places.PlacesService(map);
service.getDetails(request, callback);
```

<br> 
여기서는 createInfoWindow 함수의 인자로 placeId를 받아와, `getDetails()`로 정보를 요청하고, 정보가 성공적으로 수신되었을 때 결과값(`place`)을 `<InfoWindow />` 컴포넌트에 props로 전달하고, infowindow를 렌더하도록 작성하면 된다.

```react
createInfoWindow = (e, map, placeId) => {
    const { setPlaceDetail } = this.props;
    const request = {
      placeId
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails(request, function(place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" placeDetail={place}/>',
            position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
          });
      infoWindow.addListener('domready', () => {
      render(
          <InfoWindow
            toReviewDetail={this.toReviewDetail}
            closeInfoWindow={closeInfoWindow}
          />
          document.getElementById('infoWindow')
        );
      });
      infoWindow.open(map);
      }
    });
  };
```

<br>

---

<span class="reference">관련 post</span>

[리액트에서 구글맵 연동하기](/study/react/리액트에서-구글맵-연동하기/)
