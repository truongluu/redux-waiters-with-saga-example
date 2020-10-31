import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { isWaiting } from 'redux-waiters'
import logo from './logo.svg';
import './App.css';
import { increAction, subtractActionCreator, subtractAction, multiplyActionCreator, multiplyAction } from './reducers/counter'
import { loginAction } from './reducers/login'
import { startActionWithPromise } from './utils/saga-promise-helpers'


const isIncrSelector = isWaiting(increAction.id)
const isMultiplySelector = isWaiting(multiplyAction.id)
const isSubtractSelector = isWaiting(subtractAction.id)
const isLoginSelector = isWaiting(loginAction.id)

function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter)
  const waiter = useSelector(state => state.waiter)
  const isIncr = isIncrSelector(waiter)
  const isMultiply = isMultiplySelector(waiter)
  const isSubtracting = isSubtractSelector(waiter)
  const isLogining = isLoginSelector(waiter)
  const handleLogin = async () => {
    try {
      const loginResponse = await startActionWithPromise(loginAction, { username: 'truong', password: '1234' }, dispatch);
      console.log('login ok with response', loginResponse);
    } catch (error) {
      console.log('error occurred when logged in', error)
    }
  }

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
        <button onClick={() => handleLogin()}>Login</button>
        Counter: {counter}
        {
          isIncr && <p>Loading...</p>
        }
        {
          isMultiply && <p>Mutiplying...</p>
        }
        {
          isSubtracting && <p>Substracting...</p>
        }
        {
          isLogining && <p>Logining...</p>
        }
      </header>
    </div>
  );
}

export default App;
