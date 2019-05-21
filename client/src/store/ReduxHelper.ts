
import {GlobalReduxState} from '../reducers/intake';
import { connect } from 'react-redux';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { Dispatch } from 'redux';

function fixDispatch<D extends ActionCreatorsMapObject>(stuff: D | undefined){
    if(stuff !== undefined){
        return (dispatch: Dispatch) => bindActionCreators(stuff, dispatch);
    } else {
        return undefined;
    }
}

export function Connect<P, D extends ActionCreatorsMapObject>(mapStateToProps: (state: GlobalReduxState)=>P, actions?: D){
    return connect(mapStateToProps, fixDispatch(actions)!);
}