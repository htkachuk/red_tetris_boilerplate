import React from "react";
import ReactDom from "react-dom";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import { storeStateMiddleWare } from "./middleware/storeStateMiddleWare";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { socketMiddleware } from "./middleware/socketMiddleware";
import messageReducer from "./reducers/message";
import userReducer from "./reducers/user";
import roomReducer from "./reducers/room";
import socketReducer from "./reducers/socket";
import App from "./containers/app";
import { register } from "./actions/register";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const initialState = {
  user: {
    login: null,
    password: null,
    totalScore: null
  },
  room: {
    name: null,
    participants: null
  },
  socket: null,
  message: 0
};

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    room: roomReducer,
    socket: socketReducer,
    message: messageReducer
  }),
  initialState,
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      createLogger(),
      storeStateMiddleWare
      // socketMiddleware
    )
  )
);

// const render = () =>
ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("tetris")
);

// render();
store.dispatch(register("user", "password"));
// store.subscribe(render);
