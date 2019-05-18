import { createStore, combineReducers } from 'redux';

// TODO replace filller Reducer with a real one
const fillerReducer = () => {
    console.log('Not Implemented');
};

export default () => {
  const store = createStore(
      fillerReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
