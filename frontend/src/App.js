import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Content from './Components/Content';
import back from "./Image/фон.svg";

const styles = theme => ({});

class App extends React.Component {
    state = {};
    render() {
        const { classes, theme } = this.props;

        return (
            <div style={{backgroundImage: `url(${back})`, backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: "100vh",
                width: "100%",
            }}>
            <Header/>
            <Content/>
                </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
