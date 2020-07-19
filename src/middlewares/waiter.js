

const createWaiterMiddleWare = (extraArgument) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'object' && typeof action.callback === 'function') {
      console.log('start action with type', action.type.toString())
      // check redux saga
      if (action.callback.prototype.toString() === '[object Generator]' && !action.continue) {
        return dispatch({ ...action.action, continue: true })
      }

      if (action.callback.prototype.toString() !== '[object Generator]') {
        return action.callback(dispatch, getState, extraArgument);
      }

    }
    if (
      typeof action.type === 'string' &&
      (action.type.endsWith('success/@@end') ||
        action.type.endsWith('error/@@end'))
    ) {
      console.log('end action with type', action.type
        .replace(/(?:[^\]].*?\]\s+?)(.*)/, '$1')
        .replace(/\/success\/@@end|\/error\/@@end/, ''))
    }
    return next(action);
  };
};

const waiter = createWaiterMiddleWare();
waiter.withExtraArgument = createWaiterMiddleWare;
export default waiter;
