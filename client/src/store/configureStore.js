import { createStore, combineReducers } from 'redux';
import { intakeReducer } from '../reducers/intake';

export default () => {
  const store = createStore(
    intakeReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
