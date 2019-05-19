import React from 'react';
import firebase from 'firebase/app';
import { Firebase } from './firebase';


const FirebaseContext = React.createContext < Firebase | null > (null);

export const withFirebase = (Component: any) => (props: any) => (
    <FirebaseContext.Consumer>
        {firebase => <React.Component {...props} firebase={firebase}/>}
    </FirebaseContext.Consumer>
)
export default FirebaseContext;
