import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Content from './Components/Content';
import back from "./Image/back.svg";
import Footer from './Components/Footer';

const styles = theme => ({
});
let scrollbarStyles = {borderRadius: 5};
class App extends React.Component {
    state = {};
    render() {
        const { classes, theme } = this.props;

        return (
            <div>
            <Header/>

                <Content/>
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
