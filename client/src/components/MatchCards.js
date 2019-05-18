import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'contain',
    },
};

function MatchCard(props) {
    const { classes } = props;
    return (
        <div>
        <h1>Matches</h1>
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image="https://randomuser.me/api/portraits/men/70.jpg"
                    title="Contemplative Reptile"
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
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
        </div>
    );
}

MatchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchCard);