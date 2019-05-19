import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'

const cardStyle = {
    'borderStyle': 'dashed',
    'borderColor': 'rgba(0,0,0,0.3)',
}


class MatchCard extends Component{
    clickMatch= () =>{
        const button = document.getElementById('matchButton')
        button.innerText= 'Matched :)'
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
                        <h2> first_name last_name</h2>
                        <p> Age: <br/>
                            City: <br/>
                            Closest School: <br/>
                            Tasks: <br/>
                            Match: % <br/>
                        </p>
                    </CardContent>
                    <div align = 'center'>
                        <button type="button" id ='matchButton' onClick = {this.clickMatch}>Match!</button>
                    </div>
                </Card>
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
                            <h2> first_name last_name</h2>
                            <p> Age: <br/>
                                City: <br/>
                                Closest School: <br/>
                                Tasks: <br/>
                                Match: % <br/>
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


export default MatchCard;