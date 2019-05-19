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
}


class MatchCardBase extends Component{
    constructor(props){
        super(props);
        this.matches = ['016fc748-7d78-4e1a-9d6d-1e2237c6487b'];
        this.state = {
            'name': 'Julia S',
            'age': 25,
            'city': 'Ottawa',
            'closest_school': 'Carleton',
            'tasks': [],
            'fitness': 95
        }
    }


    clickMatch= () =>{
        const button = document.getElementById('matchButton');
       this.props.firebase.collection("seniors").doc(this.matches[0]).get().then(function(querySnapshot) {
           const doc = querySnapshot;
           const name = doc.data().name;
           button.innerText= name;
       });

    };

    render(){
        return(
            <div>
                <h1>Matches</h1>
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
                        image="https://randomuser.me/api/portraits/men/50.jpg"
                        title="Avatar"
                        style = {{'objectFit': 'contain'}}
                    />
                    <CardContent>
                        <h2> {this.state.name}</h2>
                        <p> Age: {this.state.age} <br/>
                            City: {this.state.city} <br/>
                            Closest School: {this.state.closest_school} <br/>
                            Tasks: {this.state.tasks} <br/>
                            Match: {this.state.fitness}%  <br/>
                        </p>
                    </CardContent>
                    <div align = 'center'>
                        <button type="button" id ='matchButton' onClick = {this.clickMatch}>Match!</button>
                    </div>
                </Card>
                </Grid>
            </div>

        );
    }
}

const MatchCard = withFirebase(MatchCardBase);
export default MatchCard;