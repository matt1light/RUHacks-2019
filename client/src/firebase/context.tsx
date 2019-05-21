import React from 'react';

const FirebaseContext = React.createContext < any | null > (null);

export function withFirebase<P>(Component: React.ComponentType<P>): React.FunctionComponent<P> {
    return (props: P) => (
        <FirebaseContext.Consumer>
            {firebase => <Component {...props} firebase={firebase}/>}
        </FirebaseContext.Consumer>
    );
}
export default FirebaseContext;
