import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { updateForm, IformFields } from '../actions/intake';
import firestore, {withFirebase} from '../firebase';
import {firebase} from 'react-redux-firebase';
import {Redirect} from 'react-router';
const uuidv4 = require('uuid/v4');
const University = {
    Carleton: 'Carleton University',
    Ottawa: 'University of Ottawa',
    Toronto: 'University of Toronto',
    Ryerson: 'Ryerson University',
    York: 'York University',
    Queens: 'Queens University',
    Waterloo: 'University of Waterloo',
};

interface IntakeFormPageProps{
    firebase: any;
    dispatch: any;
    intake_state: IformFields;
}
interface IntakeFormPageState{
}

export class IntakeFormPage extends Component<IntakeFormPageProps,IntakeFormPageState> {
    state = { redirect : false}
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = uuidv4();
        this.props.dispatch(updateForm({'id': id}));
        this.props.firebase.collection('students').doc(id).set({...this.props.intake_state, id});
        this.setState({redirect: true})
    }
    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.dispatch(updateForm({name: e.target.value}))
    }
    onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.dispatch(updateForm({email: e.target.value}))
    }
    onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.dispatch(updateForm({age: +e.target.value}))
    }
    onSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch(e.target.value){
            case University.Carleton: 
            case University.Ottawa:
                this.props.dispatch(updateForm({city: 'Ottawa'}));
                break;
            case University.Toronto :
            case University.Ryerson:
            case University.York:
                this.props.dispatch(updateForm({city: 'Toronto'}));
                break;
            case University.Queens:
                this.props.dispatch(updateForm({city: 'Kingston'}));
                break;
            case University.Waterloo:
                this.props.dispatch(updateForm({city: 'Waterloo'}));
                break;
            default:
                this.props.dispatch(updateForm({city: ''}));
        }
        this.props.dispatch(updateForm({school: e.target.value}))
    }
    modifyTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updates = {
            [e.target.value]: e.target.checked
        }
        this.props.dispatch(updateForm({tasks: updates}))
    }
    resetDefault = (e :React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.dispatch(updateForm({
            id: "",
            name: "",
            email: "",
            age: -1,
            school: "",
            class: "",
            city: "",
            tasks: {
                bathroom: false,
                cook: false,
                dishes: false,
                drive: false,
                driveway: false,
                feed_pets: false,
                groceries: false,
                laundry: false,
                mop: false,
                mow_lawn: false,
                plants: false,
                trash: false,
                vacuum: false,
                walk_pets: false,
            }
        }))
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} id="intake">
                <input name='name' placeholder='Name' type='text' maxLength={30} defaultValue="" onChange={this.onNameChange} value={this.props.intake_state.name}/><br/>
                <input name='email' placeholder='Email' type='email' maxLength={30} defaultValue="" onChange={this.onEmailChange} value={this.props.intake_state.email}/><br/>
                <input name='age' placeholder='Age' type='number' min={18} max={40} onChange={this.onAgeChange} value={this.props.intake_state.age}/><br/>
                <select  form = "intake" onChange={this.onSchoolChange} value={this.props.intake_state.school}>
                    <option disabled selected value="">Select University</option>
                    <option value={University.Carleton}>Carleton University</option>
                    <option value={University.Ottawa}>University of Ottawa</option>
                    <option value={University.Toronto}>University of Toronto</option>
                    <option value={University.Ryerson}>Ryerson University</option>
                    <option value={University.York}>York University</option>
                    <option value={University.Queens}>Queens University</option>
                    <option value={University.Waterloo}>University of Waterloo</option>
                </select><br/>
                <input type="checkbox" name="vaccum" value="vacuum" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.vacuum}/> vacuum<br/>
                <input type="checkbox" name="trash" value="trash" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.trash}/> trash<br/>
                <input type="checkbox" name="bathroom" value="bathroom" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.bathroom}/> bathroom<br/>
                <input type="checkbox" name="mop" value="mop" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.mop}/> mop<br/>
                <input type="checkbox" name="dishes" value="dishes" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.dishes}/> dishes<br/>
                <input type="checkbox" name="cook" value="cook" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.cook}/> cook<br/>
                <input type="checkbox" name="groceries" value="groceries" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.groceries}/> groceries<br/>
                <input type="checkbox" name="drive" value="drive" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.drive}/> drive<br/>
                <input type="checkbox" name="driveway" value="driveway" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.driveway}/> driveway<br/>
                <input type="checkbox" name="feed_pets" value="feed_pets" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.feed_pets}/> feed_pets<br/>
                <input type="checkbox" name="walk_pets" value="walk_pets" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.walk_pets}/> walking pets<br/>
                <input type="checkbox" name="laundry" value="laundry" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.laundry}/> laundry<br/>
                <input type="checkbox" name="mow_lawn" value="mow_lawn" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.mow_lawn}/> mow_lawn<br/>
                <input type="checkbox" name="plants" value="plants" onChange={this.modifyTask} checked={this.props.intake_state.tasks!.plants}/> plants<br/>
                <button onClick={this.resetDefault}> Reset</button> <button type="submit">Submit</button>
                {this.state.redirect && <Redirect push to={'/matches'}/>}
                <p><Link to={"/matches"}> We link now</Link></p>
            </form>

        );
    }
}

const mapStateToProps = (state: any, props: any) => {
    return (
        {
            intake_state: state.intake
        }
    );
}

const intakeForm = withRouter(withFirebase(IntakeFormPage));

export default connect(mapStateToProps)(intakeForm);
