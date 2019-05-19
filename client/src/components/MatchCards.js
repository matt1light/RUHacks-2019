import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'
import firestore, {withFirebase} from '../firebase';
import { firebase } from 'react-redux-firebase';
const cardStyle = {
    'borderStyle': 'dashed',
    'borderColor': 'rgba(0,0,0,0.3)',
    'maxWidth': 300
}


class MatchPageBase extends Component {
    constructor(props){
        super(props);
        this.state = {
            'ids' : []
        };
    }
    componentDidMount() {
        this.getIDs();
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
    check = () =>{
        console.log(this.state.ids);
    }
    render(){
        return(
            <div>
                <button type="button" id ='checkButton' onClick = {this.check}>Check</button>
                <h1>Matches</h1>
                {
                    this.state.ids.map((id) => (
                            <MatchCard id = {id}/>
                            ))

                }
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
            'fitness': 95
        }
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


    render(){
        return(
            <div>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing = {40}
                >

                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        alt="Avatar"
                        height="140"
                        image={this.state.photo}
                        title="Avatar"
                        style = {{'objectFit': 'contain'}}
                    />
                    <CardContent>
                        <h2> {this.state.name}</h2>
                        <p> Age: {this.state.age} <br/>
                            City: {this.state.city} <br/>
                            Closest School: {this.state.closest_school} <br/>
                            Tasks: {this.state.tasks.join(', ')} <br/>
                            Match: {this.state.fitness}%  <br/>
                        </p>
                    </CardContent>
                    <div align = 'center'>
                        <button type="button" id ='matchButton'>Match!</button>
                    </div>
                </Card>
                </Grid>
            </div>

        );
    }
}

const MatchCard = withFirebase(MatchCardBase);

const MatchPage = withFirebase(MatchPageBase);

export default MatchPage;