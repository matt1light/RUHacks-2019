import React, { Component } from 'react';
import { connect } from 'react-redux';

export class IntakeFormPage extends Component {
    state = {  }
    render() { 
        return (
        <div>{ console.log('Rendered', this.props.intake)}</div>);
    }
}

const mapStateToProps = (state, props) => {
    return (
        {
            intake: state.intake
        }
    );
}
 
export default connect(mapStateToProps)(IntakeFormPage);