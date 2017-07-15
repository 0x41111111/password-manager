import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.css';

import App from './app';
import reducers from 'state/reducers';

import registerServiceWorker from './registerServiceWorker';

// Used to satisfy Reactotron. Will be removed when other middleware functions are added.
const noop = store => next => action => {
  let result = next(action)
  return result
}

const middleware = applyMiddleware(noop);
let store;

if (process.env.NODE_ENV === "development") {
  const r = require("dev/reactotron");
  store = r.devStore(reducers, middleware);
}

store = createStore(reducers, middleware);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
