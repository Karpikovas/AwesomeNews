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
import TagIcon from '@material-ui/icons/Loyalty';
import Chip from '@material-ui/core/Chip';
import PublicIcon from '@material-ui/icons/Language';
import GroupIcon from '@material-ui/icons/Group';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import MenuIcon from '@material-ui/icons/Menu';

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
                    <AppBar style={{background:'transparent', boxShadow: 'none', height: 70}}>
                        <img src={logo} alt="My logo" style={{ backgroundSize: 'cover', height:'15vh', marginLeft: -15, marginRight: "auto", marginTop: 5}} />
                        <Toolbar>

                            <Fab  color="secondary" aria-label="Menu" onClick={this.handleDrawerOpen} style={{marginLeft:"auto", marginRight: 30, marginTop: -210}}>
                                <TagIcon />
                            </Fab>
                        </Toolbar>
                    </AppBar>

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
                        <Divider variant="middle" style={{backgroundColor:"#4a4d4f"}}/>
                        <div>
                            <Typography variant="overline" style={{position:"relative", display:"inline-block", fontSize: 16, textAlign:'center', color: "#737577", fontFamily:"Russo One"}}>
                                Теги по теме
                            </Typography>
                            <Typography variant="overline" style={{paddingLeft: 10, position:"relative", display:"inline-block",fontSize: 16, textAlign:'center', color: "white", fontFamily:"Russo One"}}>
                                Политика
                            </Typography>
                        </div>
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
                        <Divider variant="middle" style={{backgroundColor:"#4a4d4f"}}/>
                        <List style={{padding:7, justiftyContent:"center", alignItems:"center"}}>
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