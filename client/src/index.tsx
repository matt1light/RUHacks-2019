import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store/configureStore';
import AppRouter from './routers/AppRouter';
import { FirebaseContext } from './firebase';
import firestore from './firebase';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={firestore}>
            <AppRouter />
        </FirebaseContext.Provider>,
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
