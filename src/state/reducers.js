import { combineReducers } from 'redux';
import reject from 'lodash.reject';

import { entryActions, categoryActions } from 'state/action-names';

function ui(state = { authenticated: true }, action) {
  return state;
};

export function entries(state = [], action) {
  let newState = state;

  switch (action.type) {
    case entryActions.upsert:
      const i = newState.findIndex(v => v.id === action.entry.id);
      if (i < 0) { // the entry doesn't exist; create a new one
        newState.push(action.entry);
      } else { // update an existing entry
        newState[i] = action.entry;
      }
      break;
    case entryActions.delete:
      newState = reject(newState, v => v.id === action.id);
      break;
    default:
      break;
  };

  return newState;
};

export function categories(state = [], action) {
  let newState = state;

  switch (action.type) {
    case categoryActions.upsert:
      const i = newState.findIndex(v => v.id === action.category.id);
      if (i < 0) {
        newState.push(action.category);
      } else {
        newState[i] = action.category;
      }
      break;
    case categoryActions.delete:
      newState = reject(newState, v => v.id === action.id);
      break;
    default:
      break;
  };

  return newState;
}

const container = combineReducers({ entries, categories });

export default combineReducers({ ui, container });
