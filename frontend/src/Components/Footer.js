import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import back from "../Image/back.svg";
import UpIcon from '@material-ui/icons/ArrowUpward';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';

import PoliticIcon from '@material-ui/icons/AccountBalance'
import WorldIcon from '@material-ui/icons/Public'
import CultureIcon from '@material-ui/icons/ColorLens'
import ScienceIcon from '@material-ui/icons/School'
import SocialIcon from '@material-ui/icons/Group'

const styles = theme => ({
    root: {
        width: 500,
        background:'transparent',
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingBottom: theme.spacing.unit * 2,
        color: 'white'
    },
    root1: {
        width: '100vh',
        background:'transparent',
        display: 'inline-block',
        paddingBottom: theme.spacing.unit * 2,
    },
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
        display:'fixed'
    },
    toolbar: {
        minHeight: 73,
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
        intervalId: 0,
        value: 'Последние'

    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
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
        const { value } = this.state;
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

/*
*                 <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
                    <BottomNavigationAction label="Последние" value="Последние" icon={<RestoreIcon />} style={{color: '#b0b5b5'}} />
                    <BottomNavigationAction label="Мир" value="Мир" icon={<WorldIcon />} style={{color:'#b0b5b5'}}/>
                    <BottomNavigationAction label="Политика" value="Политика" icon={<PoliticIcon />} style={{color:'#b0b5b5'}} />
                    <BottomNavigationAction label="Общество" value="Общество" icon={<SocialIcon />} style={{color:'#b0b5b5'}} />
                    <BottomNavigationAction label="Наука" value="Наука" icon={<ScienceIcon />} style={{color:'#b0b5b5'}} />
                    <BottomNavigationAction label="Культура" value="Культура" icon={<CultureIcon />} style={{color:'#b0b5b5'}} />
                </BottomNavigation>
                */