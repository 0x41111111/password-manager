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
  return next(action)
}

const middleware = applyMiddleware(noop);
let store;

if (process.env.NODE_ENV === "development") {
  const r = require("dev/reactotron");
  store = r.devStore(reducers, middleware);
}

store = createStore(reducers, middleware);

// Used to trigger development mode.
// Needs to be called with a magic string.
// If the string matches, the dev mode flag is written to localStorage and the user is asked to reload the page.
window.polyfillOrCaulk = (input = undefined) => {
  if(!input && process.env.NODE_ENV === 'production') {
    console.warn("WARNING! YOU SHOULD ONLY BE USING THIS WITH A DEVELOPMENT BUILD!");
    console.warn("If you want to continue, call this function again with 'polyfill' as the only parameter.");
    return;
  }

  if (input !== "polyfill") {
    console.error('Try again.');
    return;
  };

  console.log("Enabling development mode...");
  localStorage.setItem("_.devModeOn", "1");
  console.log("Reload the page. You should now have access to the dev tab in the settings menu.");
};

if (localStorage.getItem("_.devModeOn") === "1") {
  console.log("development mode has been enabled, updating the app state to match");
  store.dispatch({ type: "UI_ENABLE_DEVELOPMENT_MODE" });
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
