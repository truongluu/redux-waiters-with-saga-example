import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import waiter from './middlewares/waiter'

import reducers from './reducers'
import rootSaga from './sagas'

import App from './App';
import * as serviceWorker from './serviceWorker';

const sagaMiddleWare = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(waiter, sagaMiddleWare, thunk));

sagaMiddleWare.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
