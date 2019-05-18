import { createStore, combineReducers } from 'redux';
import { intakeReducer } from '../reducers/intake';

export const configureStore = () => {
  const store = createStore(
    combineReducers(
      {
        intake: intakeReducer,
      }
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

export default configureStore;