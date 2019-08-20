---
layout: post
title: React Native에서 Redux-Saga 적용하기
date: 2019-08-20
comments: true
categories: [Study, rnative]
tags: [React Native, Redux]
excerpt: 이전 프로젝트에서는 API 통신과 같은 비동기 처리를 위해 redux-thunk 미들웨어를 사용했었는데, 여기저기서 redux-saga가 좋다, 기회가되면 한 번 써봐라고 해서 도전! 해보았다.
---

이전 프로젝트에서는 API 호출과 같은 비동기 처리를 위해 [redux-thunk 미들웨어](https://github.com/reduxjs/redux-thunk)를 사용했었는데, 여기저기서 [redux-saga](https://github.com/redux-saga/redux-saga)가 좋다, 기회가되면 한 번 써봐라고 해서 도전! 해보았다.

redux-thunk 에서는 객체를 반환하는 액션과, 비동기 처리를 위한 함수를 반환하는 액션이 혼재되어 있어 복잡한 느낌을 준다. 하지만 redux-saga를 사용해 보니 훨씬 깔끔! 😺

기본적으로 액션은 type과 payload를 가지는 순수 객체만을 반환하고, API 통신과 같은 비동기 프로세스는 saga 함수로 작성해 준다. 특정 saga 함수는 store를 리스닝 하고 있다가 특정 액션이 실행되면 실행된다.

**서버에서 카테고리 리스트를 가지고 오는 API**를 실행한다고 했을 때, 액션은 다음과 같이 정의해 줄 수 있다.

### 액션 정의하기

```react
export const getCategories = () => {
  return { type: INIT_GET_CATEGORIES };
};
export const getCategoriesSuccess = response => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: response
});
export const getCategoriesFail = error => ({
  type: GET_CATEGORIES_FAIL,
  error
});
```

### 리듀서 정의하기

```react
const INITIAL_STATE = {
  loading: false,
  success: false,
  categories: []
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case INIT_GET_CATEGORIES:
      return {
        ...state,
        loading: true,
        success: false
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload.success,
        categories: payload.categories
      };
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error
      };
    default:
      return state;
  }
};
```

여기까지는 기존에 사용하던 리덕스와 크게 다르지 않다. 이제 saga 함수를 정의해 주어야 한다.

### saga 정의하기

```react
import { put, call, takeLatest, all } from 'redux-saga/effects';
import * as actions from '../actions';

const makeBearerToken = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
  return `Bearer ${userToken}`;
};

const makeHeaderWithToken = bearerToken => {
  return {
    headers: {
      Authorization: bearerToken
    }
  };
};

function* handleGetCategories() {
  try {
    const bearerToken = yield makeBearerToken();
    const config = makeHeaderWithToken(bearerToken);
    const { data } = yield axios.get(
    `${serverEndpoint}:${port}/category`,
     config
    );
    yield put(actions.getCategoriesSuccess(data));
  } catch (error) {
    yield put(actions.getCategoriesFail(error));
  }
}

export function* categorySagas() {
  yield all([
    takeLatest('INIT_GET_CATEGORIES', handleGetCategories),
  ]);
}
```

마지막 줄이 중요한데, `'INIT_GET_CATEGORIES'`라는 액션이 실행되면, `handleGetCategories`를 실행하라는 것이다.

또한, API 프로세스가 성공했을 때 이전에 정의한 `getCategoriesSuccess`을 호출할 수 도 있고, `yield put()` 내에 바로
`{ type: 'GET_CATEGORIES_SUCCESS', payload: data }`를 적용해 줄 수 도 있다.

```react
yield put(actions.getCategoriesSuccess(data));
//yield put({ type: 'GET_CATEGORIES_SUCCESS', payload: data });
```

### redux-saga 연결하기

/saga/index.js 파일에 아래와 같이 rootSaga를 정의해 주고,

```react
import { spawn } from 'redux-saga/effects';
import { categorySagas } from './categorySagas';

export default function* rootSaga() {
  yield spawn(categorySagas);
}
```

store.js에서 `store`를 생성할 때 미들웨어로 `sagaMiddleware`를 적용한다.
또한, `rootSaga`를 `run` 해준다.

```react
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);
export default store;
```
