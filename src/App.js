import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { isWaiting, anyWaiting } from 'redux-waiters'
import logo from './logo.svg';
import './App.css';
import { increAction } from './reducers/counter'


const isIncrSelector = isWaiting(increAction.start)

function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter)
  const waiter = useSelector(state => state.waiter)
  console.log('waiter', waiter)
  const isIncr = isIncrSelector(waiter)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => dispatch(increAction.start(1))}>Incr</button>
        Counter: {counter}
        {
          isIncr && <p>Loading...</p>
        }
      </header>
    </div>
  );
}

export default App;
