import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { isWaiting, useWaiter } from 'redux-waiters'
import { increAction, subtractActionCreator, subtractAction, multiplyActionCreator, multiplyAction } from './reducers/counter'


const isIncrSelector = isWaiting(increAction.id)
const isMultiplySelector = isWaiting(multiplyAction.id)
const isSubtractSelector = isWaiting(subtractAction.id)

function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter)
  const [isIncr] = useWaiter(isIncrSelector)
  const [isMultiply] = useWaiter(isMultiplySelector)
  const [isSubtracting] = useWaiter(isSubtractSelector)

  const handleClick = async () => {
    await dispatch(increAction.start(1));
  }
  return (
    <>
      <button onClick={() => dispatch(multiplyActionCreator(2))}>Multiply with 2</button>
      <button onClick={() => dispatch(subtractActionCreator())}>Desc</button>
      <button onClick={() => handleClick()}>Incr</button>

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
    </>
  );
}

export default React.memo(Counter);
