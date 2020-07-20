import { all, takeEvery, delay, put, takeLatest } from 'redux-saga/effects'

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
    return 'erro';
  }
}

function wrapWithGenerator(handler) {

  return function* wr(action) {
    if (!!action.continue) {
      yield* handler(action)
    } else {
      yield put({
        type: increAction.start,
        callback: handler,
        action
      })
    }

  }
}

function* watchIncrCounter() {
  debugger;
  yield takeLatest(increAction.start, wrapWithGenerator(incrCounter))
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