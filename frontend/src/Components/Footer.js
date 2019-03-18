import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import back from '../footer.jpg'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    footer: {
        //backgroundColor: theme.palette.background.paper,
        backgroundImage: `url(${back})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', width: "100%", height: "100%",

        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
    }
});

function Footer(props) {
    const { classes } = props;

    return (
        <footer className={classes.footer}>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    React App with Material UI
                </Typography>
                <Typography component="p">
                    @2018 All right reserved
                </Typography>
            </Paper>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);