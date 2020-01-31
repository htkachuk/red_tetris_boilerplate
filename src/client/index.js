import React from "react";
import ReactDom from "react-dom";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { storeStateMiddleWare } from "./middleware/storeStateMiddleWare";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { socketMiddleware } from "./middleware/socketMiddleware";
import reducer from "./reducers";
import App from "./containers/app";
import { alert } from "./actions/alert";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
// import "./styles.css";

export const history = createBrowserHistory();

const initialState = {};

const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  applyMiddleware(
    thunk,
    routerMiddleware(history),
    createLogger(),
    socketMiddleware,
    storeStateMiddleWare
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

store.dispatch(alert("Soon, will be here a fantastic Tetris ..."));
