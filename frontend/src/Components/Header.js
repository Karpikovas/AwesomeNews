import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as actions from "../store/actions/auth";
import * as actionss from "../store/actions/news";
import connect from "react-redux/es/connect/connect";
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
import WorldIcon from '@material-ui/icons/Public'
import GroupIcon from '@material-ui/icons/Group';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LogoutIcon from "@material-ui/icons/ExitToApp"
import PoliticIcon from '@material-ui/icons/AccountBalance'
import SportIcon from '@material-ui/icons/FitnessCenter'
import MusicIcon from '@material-ui/icons/Headset'
import AutoIcon from '@material-ui/icons/DirectionsCar'
import ITIcon from '@material-ui/icons/Computer'
import Avatar from '@material-ui/core/Avatar';
import RestoreIcon from '@material-ui/icons/Restore';

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
    chipSimple: {
        margin: theme.spacing.unit,
        backgroundColor: "#565555",
        color: "#B6B6B6",
    },
    chipRestore: {
        margin: theme.spacing.unit,
        marginLeft: theme.spacing.unit*5,
        backgroundColor: "#FA4CE3",
        color: "white",

    },
    chipWorld: {
        margin: theme.spacing.unit,
        backgroundColor: "#06E5AE",
        color: "white",
    },
    chipPolitic: {
        margin: theme.spacing.unit,
        backgroundColor: "#9706E5",
        color: "white",
    },
    chipSocial: {
        margin: theme.spacing.unit,
        backgroundColor: "#4de0e8",
        color: "white"
    },
    chipAuto: {
        margin: theme.spacing.unit,
        backgroundColor: "#ff0066",
        color: "white",
    },
    chipIT: {
        margin: theme.spacing.unit,
        backgroundColor: "#3399ff",
        color: "white",
        marginLeft: theme.spacing.unit*5,
    },
    chipSport: {
        margin: theme.spacing.unit,
        backgroundColor: "#3314FF",
        color: "white"
    },
    chipMusic: {
        margin: theme.spacing.unit,
        backgroundColor: "#07DA1A",
        color: "white"
    },
});
/*
* 0 - Главные
* 1 - Политика
* 2 - Мир
* 3 - Авто
* 4 - Общество
* 5 - Музыка
* 6 - Спорт
* 7 - Технологии*/

const chips = [
    {key: 0, label: 'Главные', arg: 'main'},
    {key: 1, label: 'Политика', arg: 'politics'},
    {key: 2, label: 'Мир', arg: 'world'},
    {key: 3, label: 'Авто', arg: 'auto'},
    {key: 4, label: 'Общество', arg: 'society'},
    {key: 5, label: 'Музыка', arg: 'music'},
    {key: 6, label: 'Спорт', arg: 'sport'},
    {key: 7, label: 'Технологии', arg: 'IT'},
];
class Header extends React.Component {
    state = {
        open: false,
        click: false,
        array: []
    };
    click  = data => {
        var chip = {
            key: data.key,
            label: data.label,
            arg: data.arg
        };
        var flag = true;
        this.props.categories.map(item =>{
            if (item.key === chip.key)
                flag = false;
        })
        if (flag)
            this.props.setCategory(chip);
    };
    delete = data => {
        var chip = {
            key: data.key,
            label: data.label,
            arg: data.arg
        };

        if (this.props.categories.length > 1){
            this.props.deleteCategory(chip);
        }


    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        console.log("qqq");
        console.log(this.props.categories);
    }

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
                <div className={classes.root}>
                    <AppBar style={{background:'transparent', boxShadow: 'none', height: 70}}>
                        <img src={logo} alt="My logo" style={{ backgroundSize: 'cover', height:'13vh', marginLeft: -15, marginRight: "auto", marginTop: 5}} />
                        <Toolbar>

                            <Fab  color="secondary" aria-label="Menu" onClick={this.handleDrawerOpen} style={{marginLeft:"auto", marginRight: 30, marginTop: -180}}>
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
                            </IconButton >
                            <IconButton style={{color:'#b0b5b5', fontSize: 40, marginRight: 20, marginLeft:'auto'}}>
                                <LogoutIcon style={{color:'#b0b5b5', fontSize: 40}} onClick={this.props.logout}/>
                            </IconButton>
                        </div>
                        <Divider variant="middle" style={{backgroundColor:"#4a4d4f"}}/>
                        <div>
                            <Typography variant="overline" style={{paddingLeft: 40,position:"relative", display:"inline-block", fontSize: 16, textAlign:'center', color: "#737577", fontFamily:"Russo One"}}>
                                Выберите категории
                            </Typography>
                        </div>
                        <List style={{padding:30, justiftyContent:"center", alignItems:"center", paddingTop: 10}}>
                            <Chip
                                key={chips[0].key}
                                avatar={<Avatar style={{backgroundColor:"#FA4CE3"}}><RestoreIcon style={{color:"white"}}/></Avatar>}
                                label={chips[0].label}
                                className={classes.chipRestore}
                                onClick={(label) => this.click(chips[0])}
                                component="a"
                                clickable
                                variant="outlined"
                            />
                            <Chip
                                key={chips[1].key}
                                label={chips[1].label}
                                avatar={<Avatar style={{backgroundColor:"#9706E5"}}><PoliticIcon style={{color:"white"}}/></Avatar>}
                                className={classes.chipPolitic}
                                component="a"
                                href="#chip"
                                clickable
                                variant="outlined"
                                onClick={(label) => this.click(chips[1])}
                            />
                            <Chip
                                avatar={<Avatar style={{backgroundColor:"#06E5AE"}}><WorldIcon style={{color:"white"}}/></Avatar>}
                                key={chips[2].key}
                                label={chips[2].label}
                                className={classes.chipWorld}
                                onClick={(label) => this.click("Мир")}
                                component="a"
                                clickable
                                variant="outlined"
                                onClick={(label) => this.click(chips[2])}
                            />

                            <Chip
                                key={chips[3].key}
                                label={chips[3].label}
                                avatar={<Avatar style={{backgroundColor:"#ff0066"}}><AutoIcon style={{color:"white"}}/></Avatar>}
                                className={classes.chipAuto}
                                component="a"
                                href="#chip"
                                clickable={true}
                                variant="outlined"
                                onClick={(label) => this.click(chips[3])}
                            />
                            <Chip
                                key={chips[4].key}
                                label={chips[4].label}
                                avatar={<Avatar style={{backgroundColor:"#4de0e8"}}><GroupIcon style={{color:"white"}}/></Avatar>}
                                className={classes.chipSocial}
                                component="a"
                                href="#chip"
                                clickable
                                variant="outlined"
                                onClick={(label) => this.click(chips[4])}
                            />
                            <Chip
                                key={chips[5].key}
                                label={chips[5].label}
                                avatar={<Avatar style={{backgroundColor:"#07DA1A"}}><MusicIcon style={{color:"white"}}/></Avatar>}
                                className={classes.chipMusic}
                                component="a"
                                href="#chip"
                                variant="outlined"
                                clickable={true}
                                onClick={(label) => this.click(chips[5])}
                            />
                            <Chip
                                key={chips[6].key}
                                label={chips[6].label}
                                avatar={<Avatar style={{backgroundColor:"#3314FF"}}><SportIcon style={{color:"white"}}/></Avatar>}
                                className={classes.chipSport}
                                component="a"
                                href="#chip"
                                clickable
                                variant="outlined"
                                onClick={(label) => this.click(chips[6])}
                            />

                            <Chip
                                key={chips[7].key}
                                label={chips[7].label}
                                avatar={<Avatar style={{backgroundColor:"#3399ff"}}><ITIcon style={{color:"white"}}/></Avatar>}
                                className={classes.chipIT}
                                component="a"
                                href="#chip"
                                clickable={true}
                                variant="outlined"
                                onClick={(label) => this.click(chips[7])}
                            />

                        </List>
                        <Divider variant="middle" style={{backgroundColor:"#4a4d4f"}}/>
                        <List style={{padding:30, justiftyContent:"center", alignItems:"center", paddingTop: 10}}>
                            {this.props.categories.map(data => (
                                <Chip
                                    key = {data.key}
                                    label={data.label}
                                    className={classes.chipSimple}
                                    onDelete={(label) => this.delete(data)}
                                    component="a"
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
const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        logout: () => dispatch(actions.logout()),
        setCategory: (data) => dispatch(actionss.setLocalCategories(data)),
        deleteCategory: (data) => dispatch(actionss.deleteCategories(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Header));