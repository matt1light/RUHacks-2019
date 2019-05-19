import { createStore, combineReducers } from 'redux';
import { intakeReducer } from '../reducers/intake';
import { reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';


const rrfConfig = {
  useFirestoreForProfile: true,
  userProfile: 'users'
}
export const configureStore = () => {
  const store = createStore(
    combineReducers(
      {
        intake: intakeReducer,
      },
    ),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
};

export default configureStore;
