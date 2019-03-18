import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import logo from '../Image/logo.svg';
import back from '../Image/фон.svg';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Loyalty';
import Chip from '@material-ui/core/Chip';
import PublicIcon from '@material-ui/icons/Public';
import GroupIcon from '@material-ui/icons/Group';


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
        backgroundColor: '#111212'
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
    },
    chipPolitic: {
        margin: theme.spacing.unit,
        backgroundColor: "#ff0066",
        color: "white",
    },
    chipSocial: {
        margin: theme.spacing.unit,
        backgroundColor: "#3399ff",
        color: "white"
    },
});

class Header extends React.Component {
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
                <div className={classes.root}>
                    <img src={logo} alt="My logo" style={{ backgroundSize: 'cover', height:'17vh'}} />

                    <Fab color="secondary" aria-label="Add" style={{marginLeft:"auto", marginRight: -260, marginTop: 20}} className={classes.fab} onClick={this.handleDrawerOpen}>
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
                        <Divider/>
                        <List style={{padding:7, justiftyContent:"center", alignItems:"center"}}>
                            {['Внешняя политика', 'В мире', 'Власть', 'Регионы'].map((text, index) => (
                                <Chip
                                    label={text}
                                    icon={<PublicIcon style={{color:"white"}}/>}
                                    className={classes.chipPolitic}
                                    component="a"
                                    href="#chip"
                                    clickable
                                    variant="outlined"
                                />
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['Религия', 'Происшествия', 'Образование', 'Здоровье'].map((text, index) => (
                                <Chip
                                    label={text}
                                    icon={<GroupIcon style={{color:"white"}}/>}
                                    className={classes.chipSocial}
                                    component="a"
                                    href="#chip"
                                    clickable
                                    variant="outlined"
                                />
                            ))}
                        </List>
                    </Drawer>
                </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);