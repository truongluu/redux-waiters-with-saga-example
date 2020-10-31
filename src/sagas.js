import { all, takeEvery, delay, put, takeLatest } from 'redux-saga/effects'

import { increAction } from './reducers/counter'
import { loginAction } from './reducers/login'

import { sagaPromise } from './utils/saga-promise-helpers'

function* incrCounter(action) {
  try {

    console.log('call incrCounter start', action)
    yield delay(4000)
    console.log('call increcounter continue')
    yield put(increAction.success(1));
    console.log('call incr success')
  } catch (err) {
    console.log('err', err)
    return 'erro';
  }
}


function* watchIncrCounter() {
  yield takeLatest(increAction.start, increAction.waiterActionForSaga(incrCounter))
}

function* watchLog() {
  yield takeEvery('*', function* log(action) {
    console.log('action', action)
  })
}

function* userLogin() {
  /**
   * //Simulate login successful
   * const loginResult = true;
   * yield delay(4000);
   * return loginResult;
   */


  // Simulate login failed
  throw new Error('not ofund');

}


function* watchLogin() {
  yield takeEvery(loginAction.start, loginAction.waiterActionForSaga(sagaPromise(userLogin)));
}

export default function* rootSaga() {
  yield all([
    watchIncrCounter(),
    watchLog(),
    watchLogin()
  ])
}