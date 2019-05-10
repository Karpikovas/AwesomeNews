import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import VerticalTimeline  from './VerticalTimeline';
import WorkIcon from '@material-ui/icons/Devices';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../store/actions/news';
import VerticalTimelineElement from './VerticalTimelineElement';
import '../CSS/VerticalTimeline.css';
import '../CSS/VerticalTimelineElement.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavigationIcon from '@material-ui/icons/Navigation';
import Scroll from 'react-infinite-loading';
import data from '../4pda';
import {logout} from "../store/actions/auth";
import DialogActions from "./AuthForm";

var cnt = 0;
const styles = theme => ({
    content:{
        background: 'blue',
    },
    loadicon:{
        position: 'absolute',
        top: '35%',
        left: '47%',
        transfrom: 'translate(-50%, -50%)',
    },
    fab:{
        position:'relative',
        marginLeft:'auto',
        marginRight: 0,
        marginTop: theme.spacing.unit *2,
        background: 'rgb(33, 150, 243)',
        color:'white',
        '&:hover': {
            background: 'rgb(33, 120, 220)'
        }
    }
});
class Content extends  React.Component{

    state = {
        news: null,
        isLoad: false
    }
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
          news: this.props.news
        };
    }


    paneDidMount = (node) => {

        if(node) {
            node.addEventListener("scroll", this.handleScroll.bind(this));
        }
    }

    handleScroll = (e) => {
        //var node = event.target;
        const bottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - 2 <= document.documentElement.clientHeight;
        //console.log(document.documentElement.scrollHeight - document.documentElement.scrollTop);
        if (bottom) {
            console.log("BOTTOM REACHED:",bottom);


                this.props.getNews();
                console.log(cnt);
                //console.log(this.props.news);
            //console.log(this.state.news);
                this.setState({isLoad: true});
            setTimeout(() => {
                this.setState({isLoad: false});
            }, 9000);

        }
    }
    getMoreNews = () => {
        this.props.getNews();
        console.log(cnt);
        console.log(this.props.news);
        //cnt++;
        this.setState({isLoad: true});
        setTimeout(() => {
            this.setState({isLoad: false});
        }, 9000);
    }
    componentDidMount(){
        this.props.getNews();
        console.log(cnt);
    }

    render(){
        const { classes } = this.props;

        return (


            <div className='page-wrapper' ref="contentElement">
            {
               // !this.props.isLoading ?
                <Scroll
                    handleLoading={this.getMoreNews} loading={this.state.isLoad}
                    elementScroll={false}
                >
                        <VerticalTimeline >

                            {

                                this.props.news.map((item) =>(
                                <VerticalTimelineElement
                                    key = {cnt++}
                                    className="vertical-timeline-element--work"
                                    date={item.pubDate.slice(0, -5)}
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    icon={<WorkIcon />}

                                >
                                    <h3 className="vertical-timeline-element-title">{item.title}</h3>
                                    <h4 className="vertical-timeline-element-subtitle"></h4>
                                    <p>
                                        Автор: {item.author}
                                    </p>
                                    <Button
                                        variant="extended"
                                        size="small"
                                        //style={{background: 'rgb(33, 150, 243)', color:'white'}}
                                        //color='primary'
                                        aria-label="Add"
                                        className={classes.fab}
                                        href={item.guid}
                                        target="_blank"
                                    >
                                        <NavigationIcon className={classes.extendedIcon} />
                                        Читать в источнике
                                    </Button>

                                </VerticalTimelineElement>

                            ))}
                            { this.state.isLoad && <CircularProgress  className={classes.loadicon} color="secondary" size={90}/> }
                        </VerticalTimeline>
                </Scroll>




            }
            </div>
    );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        hasErrored: state.hasErrored,
        news: state.news
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getNews: () => dispatch(actions.newsGetData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));