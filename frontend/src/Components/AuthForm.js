import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconPerson from '@material-ui/icons/AccountCircle';
import IconAddPerson from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography'
import PropTypes from "prop-types";
import logo from "../Image/logo.svg";
import FormControl from '@material-ui/core/FormControl';
import NavigationIcon from '@material-ui/icons/Navigation'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'flex',

    },
    largeIcon: {
        width: 100,
        height: 100,
        fontSize: 100
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});
 class FormDialog extends React.Component {
    state = {
        openAuth: false,
        openReg: false
    };

    handleClickOpen = () => {
        this.setState({ openAuth: true });
    };

    handleClose = () => {
        this.setState({ openAuth: false, openReg: false });
    };
     handleReg = () => {
         this.setState({ openAuth: false, openReg: true });
     };
     handleAuth = () => {
         this.setState({ openAuth: true, openReg: false });
     };
     handleChange = prop => event => {
         this.setState({ [prop]: event.target.value });
     };

     handleClickShowPassword = () => {
         this.setState(state => ({ showPassword: !state.showPassword }));
     };

    render() {
        const { classes, theme } = this.props;
        return (
            <div style={{textAlign:'center'}}>
                <img src={logo} alt="My logo" style={{ backgroundSize: 'cover', height:'30vh',marginTop: 20}} />
                <Typography  variant="h2" gutterBottom  style={{fontFamily: '"Black Ops One", cursive', color:'#3977e3'}}>
                    A W E S O M E - N E W S
                </Typography>
                <Typography component="h2" variant="h4" gutterBottom color='primary'>
                    Новостная лента в новом формате
                </Typography>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen} size='large' style={{marginTop:20}}>
                    <NavigationIcon className={classes.extendedIcon} />
                    Начать
                </Button>
                <Dialog
                    open={this.state.openAuth}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    PaperProps={{
                        style: {
                            background: '#f6f6f6',
                            borderRadius: '0.25em',
                            border: '4px dashed blue',
                            padding: '1em',
                        },
                    }}
                >

                    <DialogTitle id="form-dialog-title" style={{textAlign:'center'}}>
                        <IconPerson color='secondary' style={{ fontSize: 70, display:'block', marginRight:'auto', marginLeft:'auto' }}/></DialogTitle >
                    <DialogContent >
                        <DialogContentText>
                            Для входа на сайт, пожалуйста, введите свой адрес электронной почты и пароль,
                            используемый для доступа к учетной записи AwesomeNews.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <FormControl >
                            <InputLabel htmlFor="adornment-password">Пароль</InputLabel>
                            <Input
                                id="pass"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={this.handleReg} >


                            <IconAddPerson/>
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Вход
                        </Button>

                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openReg}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    PaperProps={{
                        style: {
                            background: '#f6f6f6',
                            borderRadius: '0.25em',
                            border: '4px dashed #E91E63',
                            padding: '1em',
                        },
                    }}
                >

                    <DialogTitle id="form-dialog-title" style={{textAlign:'center'}}>
                        <IconAddPerson color='primary' style={{ fontSize: 70, display:'block', marginRight:'auto', marginLeft:'auto' }}/></DialogTitle >
                    <DialogContent >
                        <DialogContentText>
                            Для создания учетной записи на сайте AwesomeNews, пожалуйста, введите свой адрес электронной почты и пароль.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <FormControl >
                            <InputLabel htmlFor="adornment-password">Пароль</InputLabel>
                            <Input
                                id="pass"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl >
                            <InputLabel htmlFor="adornment-password">Повторите пароль</InputLabel>
                            <Input
                                id="pass"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={this.handleAuth} >
                            <IconPerson/>
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            Регистрация
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
FormDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(FormDialog);