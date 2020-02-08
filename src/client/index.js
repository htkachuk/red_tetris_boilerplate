import React from "react";
import ReactDom from "react-dom";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import { storeStateMiddleWare } from "./middleware/storeStateMiddleWare";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { socketMiddleware } from "./middleware/socketMiddleware";
import userReducer from "./reducers/user";
import roomReducer from "./reducers/room";
import socketReducer from "./reducers/socket";
import tokenReducer from "./reducers/token";
import App from "./containers/app";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistStore, autoRehydrate } from "redux-persist";

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
  token: null
};

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    room: roomReducer,
    socket: socketReducer,
    token: tokenReducer
  }),
  initialState,
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      createLogger(),
      storeStateMiddleWare,
      socketMiddleware
    ),
    autoRehydrate()
  )
);

persistStore(store, {}, () => {
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
});
