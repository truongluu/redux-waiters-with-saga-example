import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { isWaiting } from 'redux-waiters'
import logo from './logo.svg';
import './App.css';
import { increAction, subtractActionCreator, multiplyActionCreator } from './reducers/counter'


const isIncrSelector = isWaiting(increAction.start)

function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter)
  const waiter = useSelector(state => state.waiter)
  const isIncr = isIncrSelector(waiter)
  const handleClick = async () => {
    await dispatch(increAction.start(1));
  }
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
        <button onClick={() => dispatch(multiplyActionCreator(2))}>Multiply with 2</button>
        <button onClick={() => dispatch(subtractActionCreator())}>Desc</button>
        <button onClick={() => handleClick()}>Incr</button>
        Counter: {counter}
        {
          isIncr && <p>Loading...</p>
        }
      </header>
    </div>
  );
}

export default App;
