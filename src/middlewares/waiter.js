

const createWaiterMiddleWare = (extraArgument) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'object' && typeof action.callback === 'function') {
      console.log('mdw', action.type.toString())
      console.log('action', action.callback.prototype.toString())
      // check redux saga
      if (action.callback.prototype.toString() === '[object Generator]') {
        console.log('call generator function')
        console.log('action.callback()', action.callback())
        return action.callback().next(action, extraArgument);
      }
      console.log('call with thunk')
      return action.callback(dispatch, getState, extraArgument);
    }
    if (
      typeof action.type === 'string' &&
      (action.type.endsWith('success/@@end') ||
        action.type.endsWith('error/@@end'))
    ) {
      console.log('mdw end', action.type
        .replace(/(?:[^\]].*?\]\s+?)(.*)/, '$1')
        .replace(/\/success\/@@end|\/error\/@@end/, ''))
    }
    return next(action);
  };
};

const waiter = createWaiterMiddleWare();
waiter.withExtraArgument = createWaiterMiddleWare;
export default waiter;
