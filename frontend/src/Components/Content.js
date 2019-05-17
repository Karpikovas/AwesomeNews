/*import React from 'react';
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
        //cnt++;
        this.setState({isLoad: true});
        setTimeout(() => {
            this.setState({isLoad: false});
        }, 9000);
    }
    componentDidMount(){
        this.props.getNews();
        //console.log(this.props.token);
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

//4779ab0a6a4d40a292791c01f483dd0a

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        hasErrored: state.hasErrored,
        news: state.news,
        token: state.token
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getNews: () => dispatch(actions.newsGetData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));*/
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import {newsGetDataSuccess, newsHasErrored} from "../store/actions/news";
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

// import './People.css';
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

const BASE_URL = 'https://newsapi.org/v2/everything?q=apple&language=ru&sortBy=publishedAt&apiKey=4779ab0a6a4d40a292791c01f483dd0a';

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paginationIndex: 0,
            data: [],
            isLoading: false,
            hasMoreItems: true
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadContent() {
        const { paginationIndex, data } = this.state;
        this._isMounted = true;
        var date, toDate;
        var datee = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear();
        if (this.state.data.length === 0)
        {
            //Current
            date = year + '-' + month + '-' + datee;
            toDate = year + '-' + month  + '-' + (datee - 1);
            console.log(date);

        } else
        {
            date = this.state.data[this.state.data.length - 1].publishedAt;
            toDate = year + '-' + month  + '-' + (datee - 1);
            year = new Date(date).getFullYear();
            month = new Date(date).getMonth()+1;
            datee = new Date(date).getDate();
            toDate = year + '-' + month  + '-' + (datee - 1);
        }




        axios.get(`https://newsapi.org/v2/everything?q=apple&language=ru&from=${date}&to=${toDate}&sortBy=publishedAt&apiKey=4779ab0a6a4d40a292791c01f483dd0a`, {
        })
            .then((res) => {
                console.log("LENGTH");
                console.log(this.state.data.length);
            this.setState({
                data: [...data, ...res.data.articles],
                    paginationIndex: paginationIndex + 1,
                    hasMoreItems: true
            });


        })

            .catch(error => console.log('err ' + error));
    }

    render () {
        const { classes } = this.props;
        const loader = <CircularProgress  className={classes.loadicon} color="secondary" size={90}/>;
        console.log("SSSSSS");
        console.log(this.state.data);
        let items = null;

        if (this.state.data !== undefined) {
            let results = this.state.data;

            items = results.map(item => {
                return  <VerticalTimelineElement
                    key = {item.publishedAt}
                    className="vertical-timeline-element--work"
                    date={new Date(item.publishedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}
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
                        href={item.url}
                        target="_blank"
                    >
                        <NavigationIcon  />
                        Читать в источнике
                    </Button>



                </VerticalTimelineElement>
            });

            return (
                <div>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadContent.bind(this)}
                        hasMore={this.state.hasMoreItems}

                        key={this.props.id}
                    >
                        <VerticalTimeline >
                            {items}
                        </VerticalTimeline>
                    </InfiniteScroll>
                </div>
            );
        } else {
            return (
                <div className="spinner">Загрузка...</div>
            );
        }
    }
}

export default withStyles(styles)(Content);