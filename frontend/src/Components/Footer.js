import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ScrollUpButton from "react-scroll-up-button";
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import StarIcon from '@material-ui/icons/Star';
import back from "../Image/back.svg";
import UpIcon from '@material-ui/icons/KeyboardArrowUp';

const styles = theme => ({
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    subHeader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundImage: `url(${back})`, backgroundPosition: 'center fixed absolute',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundHeight: '100 vh',
        backgroundWidth: '100vh',
        background:'transparent',
    },
    toolbar: {
        minHeight: 92,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    btnScroll: {
        marginLeft:"auto", marginRight: 30, marginTop: -210
    }
});



class Footer extends  React.Component{
    state = {
        intervalId: 0
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - 50);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), 16,66);
        this.setState({ intervalId: intervalId });
    }
    render(){
        const { classes } = this.props;
        return (
        <AppBar position="fixed" color="primary" className={classes.appBar} >
            <Toolbar className={classes.toolbar}>

                    <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={ () => { this.scrollToTop(); }}>
                        <UpIcon />
                    </Fab>

            </Toolbar>
        </AppBar>
    );
}

}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);