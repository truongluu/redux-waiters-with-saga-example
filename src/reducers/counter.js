import { createReducer, createActionResources } from 'redux-waiters'

export const increAction = createActionResources('incr counter')
export const subtractAction = createActionResources('subtract counter')
export const multiplyAction = createActionResources('multiply counter')

const initialState = 0;

export default createReducer({
  [increAction.success]: (state, payload) => {
    return state + payload || 1
  },
  [subtractAction.success]: (state, payload) => {
    console.log('subtract success call')
    return state - (payload || 1)
  },
  [multiplyAction.success]: (state, payload) => state * (payload || 1)
}, initialState)

export const subtractActionCreator = (quantity = 1) => subtractAction.waiterAction((dispatch) => {
  dispatch(subtractAction.success(quantity));
})

export const multiplyActionCreator = (quantity = 1) => {
  return dispatch => {
    dispatch(multiplyAction.success(quantity))
  }
}