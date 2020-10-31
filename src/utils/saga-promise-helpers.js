import { put } from 'redux-saga/effects';

export const withPromiseAndDispath = (func, params, dispacth) =>
  new Promise((resolve, reject) =>
    dispacth(func({ ...params, resolve, reject }))
  );


export const startActionWithPromise = (action, params, dispatch) => {
  return withPromiseAndDispath(action?.start, { ...params, actionMeta: action }, dispatch);
}

function resoveResult(action, result) {
  if (action?.resolve && typeof action.resolve === 'function') {
    action.resolve(result);
  }
  if (action?.successCallback && typeof action.successCallback === 'function') {
    action.successCallback(result);
  }
}

function rejectResult(action, result) {
  if (action?.reject && typeof action.resolve === 'function') {
    action.resolve(result)
  }
  if (action?.failedCallback && typeof action.failedCallback === 'function') {
    action.failedCallback(result);
  }
}

export function sagaPromise(handler) {
  return function* (action) {
    try {
      const result = yield* handler(action);
      if (action?.payload?.actionMeta.success) {
        yield put(action.payload.actionMeta.success(result));
      }
      resoveResult(action?.payload, result);
    } catch (error) {
      if (action?.payload?.actionMeta.error) {
        yield put(action.payload.actionMeta.error(error));
      }
      rejectResult(action?.payload, error);
    }
  }
}