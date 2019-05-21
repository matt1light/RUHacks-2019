import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {Connect} from '../store/ReduxHelper';
import {Link, withRouter} from 'react-router-dom';
import { updateForm, IformFields } from '../actions/intake';
import firestore, {withFirebase} from '../firebase';
import {firebase} from 'react-redux-firebase';
import './index.css'
import {Redirect, RouteComponentProps} from 'react-router';
import { Dispatch, AnyAction } from 'redux';
import { InferableComponentEnhancerWithProps } from 'react-redux';
const uuidv4 = require('uuid/v4');

const University = {
    Carleton: 'Carleton University',
    Ottawa: 'University of Ottawa',
    Toronto: 'University of Toronto',
    Ryerson: 'Ryerson University',
    York: 'York University',
    Queens: 'Queens University',
    Waterloo: 'University of Waterloo',
    McGill: 'McGill University',
    Concordia: 'Concordia University',
    Western: 'Western University',
    McMaster: 'McMaster University',
    Guelph: 'University of Guelph'
};

const taskconvert = {
    'vacuum':'vacuuming',
    'dishes': 'cleaning dishes',
    'trash': 'taking out the trash/recycling/compost',
    'cook': 'cooking meals',
    'drive': 'driving',
    'feed_pets': 'feeding pets',
    'walk_pets': 'walking pets',
    'bathroom': 'cleaning bathrooms',
    'laundry': 'doing laundry',
    'groceries': 'grocery help',
    'mop': 'mopping floors',
    'plants': 'watering plants',
    'mow_lawn': 'mowing the lawn',
    'driveway':' shoveling the driveway',
}

interface IntakeFormPageInputProps extends RouteComponentProps {
    firebase: any;
    dispatch: Dispatch<AnyAction>;
    intake_state: IformFields;
}
interface IntakeFormPageState {
}
const _connect = Connect(state => ({
        intake_state: state.intake
    }),
    {
        updateForm
    }
);
type AddedProps = typeof _connect extends InferableComponentEnhancerWithProps<infer P, any> ? P : never;

type AllProps = IntakeFormPageInputProps & AddedProps;

export class IntakeFormPage extends Component<AllProps,IntakeFormPageState> {
    state = { redirect : false}
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = uuidv4();
        this.props.updateForm({'id': id});
        this.props.firebase.collection('students').doc(id).set({...this.props.intake_state, id});
        this.setState({redirect: true})
    }
    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.updateForm({name: e.target.value})
    }
    onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.updateForm({email: e.target.value})
    }
    onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.updateForm({age: +e.target.value})
    }
    onSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch(e.target.value){
            case University.Carleton: 
            case University.Ottawa:
                this.props.updateForm({city: 'Ottawa'});
                break;
            case University.Toronto :
            case University.Ryerson:
            case University.York:
                this.props.updateForm({city: 'Toronto'});
                break;
            case University.Queens:
                this.props.updateForm({city: 'Kingston'});
                break;
            case University.Waterloo:
                this.props.updateForm({city: 'Waterloo'});
                break;
            default:
                this.props.updateForm({city: ''});
        }
        this.props.updateForm({school: e.target.value})
    }
    modifyTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updates = {
            [e.target.value]: e.target.checked
        }
        this.props.updateForm({tasks: updates})
    }
    resetDefault = (e :React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.updateForm({
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
        })
    }

    render() {
        return (
                <div>
                    <img src={require("../WIN-WIN-Logo-322x169.png")} alt="WinWinLogo" height="100"/>
                    <h3>Please fill in you information</h3>
                <form onSubmit={this.onSubmit} id="intake">
                <div>
                        <div><span>Name</span>:<input name='name' placeholder='Name' type='text' maxLength={30} defaultValue="" onChange={this.onNameChange} value={this.props.intake_state.name}/></div><br/>
                        <div><span>Email</span>:<input name='email' placeholder='Email' type='email' maxLength={30} defaultValue="" onChange={this.onEmailChange} value={this.props.intake_state.email}/></div><br/>
                        <div className='ageInput'><span>Age:</span><input name='age' placeholder='Age' type='number' min = {18} max = {40} onChange={this.onAgeChange} value={this.props.intake_state.age}/></div><br/>
                        <div>University:<select  form = "intake_state" onChange={this.onSchoolChange} value={this.props.intake_state.school}>
                            <option disabled selected value="">Select University</option>
                            <option value={University.Carleton} >{University.Carleton}</option>
                            <option value={University.Ottawa}>{University.Ottawa}</option>
                            <option value={University.Toronto}>{University.Toronto}</option>
                            <option value={University.Ryerson}>{University.Ryerson}</option>
                            <option value={University.York}>{University.York}</option>
                            <option value={University.Queens}>{University.Queens}</option>
                            <option value={University.Waterloo}>{University.Waterloo}</option>
                            <option value={University.McGill}>{University.McGill}</option>
                            <option value={University.Concordia}>{University.Concordia}</option>
                            <option value={University.Western}>{University.Western}</option>
                            <option value={University.McMaster}>{University.McMaster}</option>
                            <option value={University.Guelph}>{University.Guelph}</option>
                        </select></div><br/>
                        </div>
                        <div className="bigBox">

                        <input type="checkbox" className="Box-align" name="vaccum" value="vacuum" onChange={this.modifyTask} checked={this.props.intake_state.tasks.vacuum}/> Vacuum Weekly<br/>
                        <input type="checkbox" className="Box-align" name="trash" value="trash" onChange={this.modifyTask} checked={this.props.intake_state.tasks.trash}/>Take out the trash<br/>
                        <input type="checkbox" className="Box-align" name="bathroom" value="bathroom" onChange={this.modifyTask} checked={this.props.intake_state.tasks.bathroom}/> Clean the bathroom<br/>
                        <input type="checkbox" className="Box-align" name="mop" value="mop" onChange={this.modifyTask} checked={this.props.intake_state.tasks.mop}/> Mop bi-weekly<br/>
                        <input type="checkbox" className="Box-align" name="dishes" value="dishes" onChange={this.modifyTask} checked={this.props.intake_state.tasks.dishes}/> Do the dishes daily<br/>
                        <input type="checkbox" className="Box-align" name="cook" value="cook" onChange={this.modifyTask} checked={this.props.intake_state.tasks.cook}/> Cook Meals <br/>
                        <input type="checkbox" className="Box-align" name="groceries" value="groceries" onChange={this.modifyTask} checked={this.props.intake_state.tasks.groceries}/> Pick up groceries <br/>
                        <input type="checkbox" className="Box-align" name="drive" value="drive" onChange={this.modifyTask} checked={this.props.intake_state.tasks.drive}/> Drive someone around a few times per week<br/>
                        <input type="checkbox" className="Box-align" name="driveway" value="driveway" onChange={this.modifyTask} checked={this.props.intake_state.tasks.driveway}/> Shovel the driveway<br/>
                        <input type="checkbox" className="Box-align" name="feed_pets" value="feed_pets" onChange={this.modifyTask} checked={this.props.intake_state.tasks.feed_pets}/> Feed pets daily <br/>
                        <input type="checkbox" className="Box-align" name="walk_pets" value="walk_pets" onChange={this.modifyTask} checked={this.props.intake_state.tasks.walk_pets}/> Walk pets daily <br/>
                        <input type="checkbox" className="Box-align" name="laundry" value="laundry" onChange={this.modifyTask} checked={this.props.intake_state.tasks.laundry}/> Laundry daily <br/>
                        <input type="checkbox" className="Box-align" name="mow_lawn" value="mow_lawn" onChange={this.modifyTask} checked={this.props.intake_state.tasks.mow_lawn}/> Mow the lawn <br/>
                        <input type="checkbox" className="Box-align" name="plants" value="plants" onChange={this.modifyTask} checked={this.props.intake_state.tasks.plants}/> Watering plants <br/>
                        <button onClick={this.resetDefault} > Reset </button>
                        <button type = "submit" >Submit</button>
                        {this.state.redirect && <Redirect push to={'/matches'}/>}
                </div>
            </form>
            </div>

        );
    }
}


const intakeForm = withFirebase(IntakeFormPage);

export default _connect(intakeForm);
