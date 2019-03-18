import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import logo from './logo.svg';
import back from './фон.svg';
import Footer from './Components/Footer';
import Layout from './Components/Layout';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Loyalty';

const drawerWidth = 300;
const styles = theme => ({
    root: {
        display: 'flex',
    },

    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'black'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    background: {
        backgroundImage: `url(${back})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: "100vh",
        width: "100%",
    }
});

class PersistentDrawerRight extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div style={{backgroundImage: `url(${back})`, backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: "100vh",
                width: "100%",
               }}>
                <div className={classes.root}>
                    <img src={logo} alt="My logo" style={{ backgroundSize: 'cover', height:'17vh'}} />

                    <Fab color="secondary" aria-label="Add" className={classes.fab} onClick={this.handleDrawerOpen}>
                       <AddIcon />
                    </Fab>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="right"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerClose} style={{backgroundColor: '#2196f3'}}>
                                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text} style={{color:'white'}}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </div>
                <Layout/>
            </div>


        );
    }
}

PersistentDrawerRight.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerRight);
