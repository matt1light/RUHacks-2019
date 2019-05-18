import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateForm } from '../actions/intake';

export class IntakeFormPage extends Component {
    state = {}
    onSubmit = (e) => {
        e.preventDefault();
        // console.log(e);
    }
    onNameChange = (e) => {
        this.props.dispatch(updateForm({name: e.target.value}))
    }
    onAgeChange = (e) => {
        this.props.dispatch(updateForm({age: e.target.value}))
    }
    onSchoolChange = (e) => {
        this.props.dispatch(updateForm({school: e.target.value}))
    }
    render() { 
        return (
            <form onSubmit={this.onSubmit}>
                <input name='name' placeholder='Name' type='text' onChange={this.onNameChange} value={this.props.intake.name}/>
                <input name='age' placeholder='Age' type='text' onChange={this.onAgeChange} value={this.props.intake.age}/>
                <input name='school' placeholder='School' type='text' onChange={this.onSchoolChange} value={this.props.intake.school}/>
                <button>Submit</button>
            </form>
        );
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