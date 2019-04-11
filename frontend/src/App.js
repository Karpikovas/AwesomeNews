import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import './App.css';
import AuthForm from './Components/AuthForm'
import Button from '@material-ui/core/Button';

const styles = theme => ({

});
class App extends React.Component {
    render() {
        const { classes, theme } = this.props;

        return (
            <div style={{width:'100 vw'}}>

                <AuthForm/>
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
