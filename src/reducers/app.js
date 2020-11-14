import { createReducer, createActionResources } from 'redux-waiters'

export const appUpdateThemeAction = createActionResources('app update theme')


const initialState = {
  gl: false
};

export default createReducer({
  [appUpdateThemeAction.success]: (state) => {
    return { ...state, gl: true }
  }
}, initialState)

export const appThemeActionCreator = () => {
  return dispatch => {
    dispatch(appUpdateThemeAction.success())
  }
}