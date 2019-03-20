import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import './App.css';

const styles = theme => ({
});
class App extends React.Component {
    render() {
        const { classes, theme } = this.props;

        return (
            <div style={{width:'100 vw'}}>
                <Header/>
                <Content>

                <a href="/"
                   className="Tag Tag--electricVoilet">Design &amp; Illustration</a>


                </Content>
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
