import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import firestore, {withFirebase} from '../firebase';
import {connect} from "react-redux";
import firebase from 'firebase';
import '../styles/MatchCards.css';

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
const cardStyle = {
    'borderStyle': 'dashed',
    'borderColor': 'rgba(0,0,0,0.3)',
    'maxWidth': 300
}

const bigCardStyle = {
    'borderStyle': 'dashed',
    'borderColor': 'rgba(0,0,0,0.3)',
    'minWidth': 300,
    'maxWidth': 600,
    'position': 'absolute',
    'left': '40%',
/*    'top': '50%',

    'margin-top': '-50px',
    'margin-left': '-50px',*/

}

class MatchPageBase extends Component {
    constructor(props){
        super(props);
        this.state = {
            'ids' : [],
            'match_found': false,
            'match' : {
                'id' : '',
                'name': '',
                'age': null,
                'city': '',
                'closest_school': '',
                'tasks': [],
                'photo': '',
                'fitness': 95,
            }
        };
        console.log(this.props.intake_state);
    }
    componentDidMount() {
        this.getIDs();
    }
    foundAMatch = (match_states) =>{
        this.setState({match_found: true});
        this.setState({match: match_states});
    }
    getIDs = () =>{
        this.props.firebase.collection('seniors').get().then((querySnapshot) => {
            const IDs = [];
            querySnapshot.forEach(function(doc) {
                IDs.push(doc.id)
            });
            const sampledIDS = IDs.slice(0,10);
            this.setState({'ids': sampledIDS});
        });
    }

    render(){
        return( !this.state.match_found?
            <div>
                <div>
                    <h1>Matches</h1>
                </div>
                <div>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        spacing = {40}
                    >
                    {this.state.ids && this.state.ids.map((id) => (
                            <MatchCard id={id} student = {this.props.intake_state.id? this.props.intake_state.id : "testUUID"} buttonlistener = {this.foundAMatch}/>
                        ))}
                    </Grid>
                </div>
            </div> : <div>
                    <h1> MATCH FOUND!</h1>
                    <Card style={bigCardStyle}>
                        <CardMedia
                            component="img"
                            alt="Avatar"
                            height="300"
                            image= {this.state.match.photo}
                            title="Avatar"
                            style={{'objectFit': 'contain'}}
                        />
                        <CardContent>
                            <h2> {this.state.match.name}</h2>
                            <p> Age: {this.state.match.age} <br/><br/>
                                City: {this.state.match.city} <br/><br/>
                                Closest School: {this.state.match.closest_school}<br/><br/>
                                Tasks: {this.state.match.tasks.join(', ')} <br/><br/>
                                Match: {this.state.match.fitness}% <br/>
                            </p>
                            <div>
                            <input className="favorite styled"
                                   type="button"
                                   value="Click to chat" align = 'centre'></input>
                            </div>
                        </CardContent>
                    </Card>
                </div>
        )};
};

class MatchCardBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            'id' : props.id,
            'name': '',
            'age': null,
            'city': '',
            'closest_school': '',
            'tasks': [],
            'photo': '',
            'fitness': 95,
        }
        this.temporaryStudentUUID = '785297a3-ecfc-4e54-a801-bb65e5c99b68';
        this.getStates = this.getStates.bind(this);
    }

    getStates = () =>{
        this.props.firebase.collection("seniors").doc(this.state.id).get().then((querySnapshot) => {
            const docData = querySnapshot.data();
            this.setState({name: docData.name});
            this.setState({age: docData.age});
            this.setState({photo: docData.photo});
            this.setState({city: docData.city});
            this.setState({closest_school: docData.closest_school});
            const tasklist = [];
            for (const key in docData.tasks){
                if (docData.tasks[key]){
                    tasklist.push(key)
                }
            }
            this.setState({tasks: tasklist});
        });
    }
    componentDidMount() {
        this.getStates();
    }
    convertTaskList = (tasklist) =>{
        const newList = [];
        for (const task in tasklist){
            newList.push(taskconvert[tasklist[task]])
        }
        return newList;
    };

    pair = () => {
        const seniorRef = this.props.firebase.collection("seniors").doc(this.state.id).update(
            {

                matches: firebase.firestore.FieldValue.arrayUnion({
                    'id': this.props.student, //this.props.intake.id,
                    'selected': true,
                    'fitness': 100
                })
            }
        );
        const studentRef = this.props.firebase.collection("students").doc(this.props.student).update({
            matches:  firebase.firestore.FieldValue.arrayUnion({
                    'id': this.state.id, //this.props.intake.id,
                    'selected': true,
                    'fitness': 100
            })
        });
        this.props.buttonlistener(this.state);
    }
    render(){
        return(
            <div>
                {this.state.photo &&
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        alt="Avatar"
                        height="140"
                        image={this.state.photo}
                        title="Avatar"
                        style={{'objectFit': 'contain'}}
                    />
                    <CardContent>
                        <h2> {this.state.name}</h2>
                        <p> Age: {this.state.age} <br/><br/>
                            City: {this.state.city} <br/><br/>
                            Closest School: {this.state.closest_school} <br/><br/>
                            Tasks: {this.convertTaskList(this.state.tasks).join(', ')} <br/><br/>
                            Match: {this.state.fitness}%
                        </p>
                    </CardContent>
                    <div align='center'>
                        <button type="button" id='matchButton' onClick={this.pair}>Match!</button>
                    </div>
                </Card>
                }
            </div>

        );
    }
}

const MatchCard = withFirebase(MatchCardBase);

const MatchPage = withFirebase(MatchPageBase);


const mapStateToProps = (state, props) => {
    return (
        {
            intake_state: state.intake
        }
    );
}
connect(mapStateToProps)(MatchCard);

export default connect(mapStateToProps)(MatchPage);
