import { createReducer, createActionResources } from 'redux-waiters'

export const increAction = createActionResources('incr counter')

const initialState = 0;

export default createReducer({
  [increAction.success]: (state, payload) => {
    console.log('payload', payload)
    return state + payload || 1
  }
}, initialState)

