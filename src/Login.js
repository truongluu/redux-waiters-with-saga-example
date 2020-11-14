import React from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from './reducers/login'
import { isWaiting, useWaiter } from 'redux-waiters'
import { startActionWithPromise } from './utils/saga-promise-helpers'

const isLoginSelector = isWaiting(loginAction.id)

function Login() {
  const dispatch = useDispatch();
  const [isLogining] = useWaiter(isLoginSelector);

  const successCallback = (result) => {
    console.log('success callback', result)
  }

  const failedCallback = (error) => {
    console.log('fail callback', error)
  }

  const handleLogin = async () => {
    try {
      const loginResponse = await startActionWithPromise(loginAction, { username: 'truong', password: '1234', successCallback, failedCallback }, dispatch);
      console.log('login ok with response', loginResponse);
    } catch (error) {
      console.log('error occurred when logged in', error)
    }
  }

  return (
    <>
      <button onClick={() => handleLogin()}>Login</button>
      {
        isLogining && <p>Logining...</p>
      }
    </>
  )
}

export default React.memo(Login)