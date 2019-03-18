import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import back from "../background.jpg";

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
});
function Home(props) {
    const { classes } = props;
    return (
        <div className={classes.content}>
            <Typography variant="h5" component="h3">
                Welcome Home!
            </Typography>
        </div>
    );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);