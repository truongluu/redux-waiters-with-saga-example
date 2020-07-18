import { call, all, takeEvery, delay, put } from 'redux-saga/effects'

import { increAction } from './reducers/counter'

function* incrCounter(action) {
  try {
    console.log('call incrCounter start', action)
    yield delay(4000)
    console.log('call increcounter continue')
    yield put(increAction.success(1));
    console.log('call incr success')
  } catch (err) {
    console.log('err', err)
  }
}

function wrapWithGenerator(handler) {
  console.log('call here')
  return function* wr() {
    yield put({
      type: increAction.start,
      callback: handler
    })
  }
}

function* watchIncrCounter() {
  console.log('watch Incr counter')
  yield takeEvery(increAction.start, wrapWithGenerator(incrCounter))
}


function* watchLog() {
  yield takeEvery('*', function* log(action) {
    console.log('action', action)
  })
}
export default function* rootSaga() {
  yield all([
    watchIncrCounter(),
    watchLog()
  ])
}