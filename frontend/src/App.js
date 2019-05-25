import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import * as act from './store/actions/news';
import AuthForm from './Components/AuthForm'
import Button from '@material-ui/core/Button';

const styles = theme => ({

});
class App extends React.Component {


    componentDidMount(){
        this.props.onTryAutoSignup();
    }
    render() {
        const { classes, theme } = this.props;

        return (
            <div>
                {
                    this.props.isAuthenticated ?
                        <div style={{width:'100 vw'}}>
                            <Header/>
                            <Content/>
                            <Footer/>
                        </div>
                        :
                        <div style={{  position: 'fixed', top: '0', bottom: '0', minWidth: '320px', minHeight: 'auto', width: '100%', height: 'auto', backgroundSize: 'cover',background: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59) center'}}>
<AuthForm/>
                        </div>
                }
            </div>
        );
    }
}//top: '0',bottom: '0',position: 'fixed',
//position: 'fixed', top: '0', bottom: '0', minWidth: '320px', minHeight: '100%', width: '100%',height: 'auto',

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        news: state.news
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles, { withTheme: true })(App));
