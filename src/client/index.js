import React from "react";
import ReactDom from "react-dom";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { storeStateMiddleWare } from "./middleware/storeStateMiddleWare";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { socketMiddleware } from "./middleware/socketMiddleware";
import reducer from "./reducers";
import App from "./containers/app";
import { register } from "./actions/register";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const initialState = {
  user: {
    login: null,
    password: null,
    totalScore: null,
    roomName: null
  },
  room: {
    name: null,
    participants: null
  },
  socket: null,
  message: null
};

const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      createLogger(),
      socketMiddleware,
      storeStateMiddleWare
    )
  )
);

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

store.dispatch(register("user", "password"));
