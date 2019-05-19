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


const MatchPage = () => (
    <div>
        <h1>Matches</h1>
        <MatchCard id = {'016fc748-7d78-4e1a-9d6d-1e2237c6487b'}/>
    </div>
)

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
                        <button type="button" id ='matchButton' onClick = {this.getStates}>Match!</button>
                    </div>
                </Card>
                </Grid>
            </div>

        );
    }
}

const MatchCard = withFirebase(MatchCardBase);

export default MatchPage;