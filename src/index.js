import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.css';

import App from './app';
import reducers from 'state/reducers';
import { authActions } from 'state/action-names';

import registerServiceWorker from './registerServiceWorker';

// Used to satisfy Reactotron. Will be removed when other middleware functions are added.
const noop = store => next => action => {
  return next(action)
}

const middleware = compose(applyMiddleware(noop), autoRehydrate());
let store;

if (process.env.NODE_ENV === "development") {
  const r = require("dev/reactotron");
  store = r.devStore(reducers, middleware);
}

store = createStore(reducers, middleware);

// Save common UI settings and cloud provider keys.
persistStore(store, {
  whitelist: ["config"],
  keyPrefix: "persistent:"
});

// Loads external scripts such as the Google Drive client API.
function load(s) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = s;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  })
}

// For debug purposes
console.log("appending the Drive SDK");

function handleStateChange(state) {
  store.dispatch({
    type: authActions.setAuthStatus,
    authenticated: state
  });
}

window.handleDriveAuthStateChange = handleStateChange;

// Sets up Google's JS client library for further usage and hooks it up to Redux.
function setupDriveAPIClient(clientId) {
  window.gapi.load("client:auth2", () => {
    window.gapi.client.init({
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      clientId,
      scope: "https://www.googleapis.com/auth/drive.file"
    }).then(() => {
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(window.handleDriveAuthStateChange);
      window.handleDriveAuthStateChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  });
}

load("https://apis.google.com/js/api.js")
.then(() => {
  console.log("Loaded the Drive client API.");
  setupDriveAPIClient(process.env.REACT_APP_DRIVE_API_CLIENT_ID);
})
.catch((e) => {
  console.error("Failed to load the Drive client API. TODO: force offline mode.");
});

// Used to trigger development mode.
// Needs to be called with a magic string.
// If the string matches, the dev mode flag is written to localStorage and the user is asked to reload the page.
window.polyfillOrCaulk = (input = undefined) => {
  if (!input && process.env.NODE_ENV === 'production') {
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
