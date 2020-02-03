export const storeStateMiddleWare = store => {
  return next => action => {
    let state = store.getState();
    // console.log(action.type);
    let returnValue = next(action);
    window.top.state = store.getState();

    return returnValue;
  };
};
