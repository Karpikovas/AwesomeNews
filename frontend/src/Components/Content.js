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
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Fade from '@material-ui/core/Fade';
import InfoIcon from '@material-ui/icons/Info';

// import './People.css';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var date, toDate;
date = new Date();
date.setDate(date.getDate()+1);
var datee = date.getDate(); //Current Date
var month = date.getMonth(); //Current Month
var year = date.getFullYear();

function diff(a1, a2) {
    return a1.filter(i=>a2.indexOf(i)<0)
        .concat(a2.filter(i=>a1.indexOf(i)<0))
}
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



class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paginationIndex: 0,
            data: [],
            isLoading: false,
            hasMoreItems: true,
            flag: true,
            length: 0,
            categories: this.props.categories,
            open: false,
            token: this.props.token,
            newNews: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    loadContent() {

        if (this.state.data.length === 0)
        {
            //Current
            this.setState({isLoading: true})
            date = datee + monthNames[month] + year;
            toDate = new Date();
            toDate.setDate(toDate.getDate());

            datee = toDate.getDate(); //Current Date
            month = toDate.getMonth(); //Current Month
            year = toDate.getFullYear();

            toDate = datee + monthNames[month] + year;
/*
            this.setState({isLoading: true})
            date = '25May2019';
            toDate = '24May2019';
  */      } else if (this.state.flag){
            console.log("THIS");
            date = toDate;

            toDate = new Date(date);
            toDate.setDate(toDate.getDate()-1);
            datee = toDate.getDate(); //Current Date
            month = toDate.getMonth(); //Current Month
            year = toDate.getFullYear();

            toDate = datee + monthNames[month] + year;
        } else {
            console.log("NO THIS");
            date = new Date(year, month, datee);
            date.setDate(date.getDate()+1);
            datee = date.getDate(); //Current Date
            month = date.getMonth(); //Current Month
            year = date.getFullYear();

            date = datee + monthNames[month] + year;
        }

        const { paginationIndex, data } = this.state;
        this._isMounted = true;

        //var dataa;
        console.log("TOKEN");
        console.log(this.state.token);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.state.token}`
            }
        };
        const WORLD = axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=world&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
            .then(response => response.data)
            .catch(err => err);

        const IT = axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=IT&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
            .then(response => response.data)
            .catch(err => err);

        const SOCIETY = axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=society&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
            .then(response => response.data)
            .catch(err => err);

        const MAIN = axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=main&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
            .then(response => response.data)
            .catch(err => err);

        const POLITIC = axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=politics&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
            .then(response => response.data)
            .catch(err => err);

        const AUTO = axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=auto&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
            .then(response => response.data)
            .catch(err => err);

        const MUSIC= axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=music&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
            .then(response => response.data)
            .catch(err => err);

        const SPORT= axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=sport&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
            .then(response => response.data)
            .catch(err => err);

        var diffMas = [];
        var differ = diff(this.props.categories, this.state.categories);
        console.log(differ);

        if (differ.length != 0 && !this.state.flag){
            var Curdate;
            if (this.state.newNews[0] !== undefined)
                Curdate = new Date (this.state.newNews[0].date[0]);

            differ.map( data => {
                if (data.arg === 'world')
                    diffMas.push(WORLD);
                if (data.arg === 'main')
                    diffMas.push(MAIN);
                if (data.arg === 'politics')
                    diffMas.push(POLITIC);
                if (data.arg === 'auto')
                    diffMas.push(AUTO);
                if (data.arg === 'society')
                    diffMas.push(SOCIETY);
                if (data.arg === 'music')
                    diffMas.push(MUSIC);
                if (data.arg === 'sport')
                    diffMas.push(SPORT);
                if (data.arg === 'IT')
                    diffMas.push(IT);
            });
            console.log("RESULT");
            console.log(diffMas);
            Promise.all(diffMas)
                .then((res) => {

                    // console.log(res);
                    for (var i = 0; i < res.length; i++)
                    {

                        console.log("DDDD");
                        console.log(this.state.length);

                        for (var j = 0; j < res[i].length; j++)
                        {
                            var thatDate = new Date (res[i][j].date[0]);
                            console.log(thatDate, Curdate);

                            if ( thatDate < Curdate )
                            {
                                console.log(res[i][j]);

                                this.setState({
                                    newNews: this.state.newNews.concat(res[i][j])
                                });

                            }
                        }

                    }
                    var newdata = this.state.newNews.slice().sort(function(a,b){
                        return new Date(b.date[0]) - new Date(a.date[0]);
                    });
                    var length = newdata.length;

                    this.setState({
                        newNews: newdata,
                        length: this.state.length + length,
                        categories: this.props.categories
                    });

                    console.log(this.state.newNews);

                })
                .catch(error =>{
                    console.log('err ' + error);
                });
            date = new Date(year, month, datee);
            date.setDate(date.getDate()-1);
            datee = date.getDate(); //Current Date
            month = date.getMonth(); //Current Month
            year = date.getFullYear();

            date = datee + monthNames[month] + year;
        }

        if (this.state.flag)
        {
            var mas = [];
            this.props.categories.map( data => {
                if (data.arg === 'world')
                    mas.push(WORLD);
                if (data.arg === 'main')
                    mas.push(MAIN);
                if (data.arg === 'politics')
                    mas.push(POLITIC);
                if (data.arg === 'auto')
                    mas.push(AUTO);
                if (data.arg === 'society')
                    mas.push(SOCIETY);
                if (data.arg === 'music')
                    mas.push(MUSIC);
                if (data.arg === 'sport')
                    mas.push(SPORT);
                if (data.arg === 'IT')
                    mas.push(IT);
            });
            Promise.all(mas)
                .then((res) => {

                    for (var i = 0; i < res.length; i++)
                    {
                        this.setState({
                            newNews: this.state.newNews.concat(res[i])
                        });
                    }
                    var newdata = this.state.newNews.slice().sort(function(a,b){
                        return new Date(b.date[0]) - new Date(a.date[0]);
                    });
                    var length = newdata.length;
                    var minLength = 10;
                    if (length < 10)
                        minLength = length;

                    if (res.length === 0)
                    {
                        this.setState({
                            hasMoreItems: false,
                            flag: false,
                        });
                    }
                    var dataArr = newdata.slice(0, minLength);
                    var newsArr = newdata.splice( minLength);
                    this.setState({
                        data: [...data, ...dataArr],
                        newNews: newsArr,
                        paginationIndex: paginationIndex + 1,
                        hasMoreItems: true,
                        isLoading: false,
                        flag: false,
                        length: length - minLength,
                        categories: this.props.categories
                    });

                })
                .catch(error =>{
                    console.log('err ' + error);
                    this.setState({
                        hasMoreItems: false,
                        flag: false,
                    });
                });

            /*
            var dataa = [];
            axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=world&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
                .then((res) => {
                    for (var i = 0; i < res.data.length; i++)
                        dataa.push(res.data[i]);
                    //dataa = res.data;
                    console.log("axios 1");
                    console.log(dataa);


                })

*//*
            axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=IT&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
                .then((res) => {

                    //console.log(res.data);
                    //console.log(dataa);
                    /* var newdata = dataa.concat(res.data);
                     console.log("DATAAAA");
                     console.log(newdata);
                     newdata.sort(function(a,b){
                         return new Date(b.date[0]) - new Date(a.date[0]);
                     });

                     */
                   /* for (var i = 0; i < res.data.length; i++)
                        dataa.push(res.data[i]);
                    dataa.sort(function(a,b){
                        return new Date(b.date[0]) - new Date(a.date[0]);
                    });*/
                   /*
                    console.log("LENGTH");
                    console.log(dataa);
                    var length = dataa.length;
                    var minLength = 10;
                    if (length > 10)
                        minLength = length;
                    this.setState({
                        data: [...data, ...dataa.slice(0, minLength)],
                        paginationIndex: paginationIndex + 1,
                        hasMoreItems: true,
                        isLoading: false,
                        flag: false
                    });


                })

                .catch(error =>{
                    console.log('err ' + error);
                    this.handleClick()
                    this.setState({hasMoreItems: false});
                });*/
        } else
        {


            if (!this.state.flag && !this.state.hasMoreItems) this.handleClick();
            else if ( this.state.length === 0 ){
                console.log("RRRR");
                this.setState({flag: true,   newNews: []})
            } else
            {
                var length = this.state.length;
                var minLength = 10;
                if (length < 10)
                    minLength = length;

                var newdata = this.state.newNews;
                var dataArr = newdata.slice(0, minLength);
                var newsArr = newdata.splice( minLength);
                this.setState({
                    data: [...data, ...dataArr],
                    newNews: newsArr,
                    paginationIndex: paginationIndex + 1,
                    hasMoreItems: true,
                    isLoading: false,
                    flag: false,
                    length: length - minLength,
                });
            }
        }

    }

    render () {
        const { classes } = this.props;
        const loader = <CircularProgress  className={classes.loadicon} color="secondary" size={90}/>;
        let items = null;

        if (this.state.data !== undefined) {
            let results = this.state.data;

            items = results.map(item => {
                return  <VerticalTimelineElement
                    /*key = {item.date[0]}
                    */className="vertical-timeline-element--work"
                    date={item.date[0].slice(0,-5)}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<WorkIcon />}

                >
                    <h3 className="vertical-timeline-element-title">{item.title[0]}</h3>
                    <h4 className="vertical-timeline-element-subtitle"></h4>
                    <p>
                         {item.description[0]}
                    </p>

                    <Button
                        variant="extended"
                        size="small"
                        //style={{background: 'rgb(33, 150, 243)', color:'white'}}
                        //color='primary'
                        aria-label="Add"
                        className={classes.fab}
                        href={item.link[0]}

                        target="_blank"
                        >
                        <NavigationIcon  />
                        Читать в источнике
                    </Button>

</VerticalTimelineElement>
});

return (
<div>
    {
        !this.state.isLoading ?

            <InfiniteScroll
                pageStart={0}
                initialLoad={true}
                loadMore={this.loadContent.bind(this)}
                hasMore={this.state.hasMoreItems}
                key={this.props.id}
            >
                <VerticalTimeline >
                    {items}
                </VerticalTimeline>
            </InfiniteScroll>
            :
            <CircularProgress  className={classes.loadicon} color="secondary" size={90}/>
    }

    <Snackbar
        variant="info"
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        style={{marginBottom: 60, backgroundColor: '#3977e3'}}
        >
        <SnackbarContent
            style={{ backgroundColor: '#3977e3'}}
            message={<span>Новостей по данной теме больше нет</span>}
            action ={
                [
                    <InfoIcon/>
                ]
            }
        />
    </Snackbar>

</div>
);
}

}
}

const mapStateToProps = (state) => {
return {
isLoading: state.isLoading,
hasErrored: state.hasErrored,
news: state.news,
token: state.token,
    categories: state.categories,
}
}

const mapDispatchToProps = dispatch =>{
return {
getNews: () => dispatch(actions.newsGetData())
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));

/*
            if (this.state.data.length === 0)
            {
                //Current
                this.setState({isLoading: true})
                date = datee + monthNames[month] + year;
                toDate = new Date();
                toDate.setDate(toDate.getDate());

                datee = toDate.getDate(); //Current Date
                month = toDate.getMonth(); //Current Month
                year = toDate.getFullYear();

                toDate = datee + monthNames[month] + year;

            } else {
                date = toDate;

                toDate = new Date(year, month, datee);
                toDate.setDate(toDate.getDate()-1);
                datee = toDate.getDate(); //Current Date
                month = toDate.getMonth(); //Current Month
                year = toDate.getFullYear();

                toDate = datee + monthNames[month] + year;
            }
            const { paginationIndex, data } = this.state;
            this._isMounted = true;
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${this.props.token}`
                }
            };
            var newdata = [];
            this.props.categories.map(item => {
                axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=${item.arg}&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
                    .then((res) => {
                        newdata.unshift.apply( newdata, res.data );
                        console.log("iiiiiii");
                        console.log(typeof res.data);
                        console.log(newdata.length);
                        //console.log(item);
                        //console.log(res.data);
                    });
            });
            console.log("ddddddddd");

            //newdata = this.state.newNews;
            //console.log(newdata);

            var nDate =[];
            nDate.concat(newdata);
            newdata.sort(function(a,b){
                return new Date(b.date[0]) - new Date(a.date[0]);
            });



            var length = newdata.length/10;
            if (length === 0) length = newdata.length;

            this.setState({

                newNews: newdata.splice(0, length),
                data: [...data, ...newdata],
                flag: false,
                paginationIndex: paginationIndex + 1,
                hasMoreItems: true,
                isLoading: false,
                length: newdata.length - length,
            });
            console.log(this.state.data);


/*
            axios.get("https://cors-anywhere.herokuapp.com/"+ `http://130.193.44.202:80/index.php/api/RSS?category=IT&dateNew=${date}&dateOld=${toDate}`,  axiosConfig)
                .then((res) => {
                    console.log("LENGTH");
                    console.log(res.data);
                    console.log(dataa);
                    var newdata = dataa.concat(res.data);
                    console.log("DATAAAA");
                    console.log(newdata);
                    newdata.sort(function(a,b){
                        return new Date(b.date[0]) - new Date(a.date[0]);
                    });
                    this.setState({
                        data: [...data, ...newdata],
                        paginationIndex: paginationIndex + 1,
                        hasMoreItems: true,
                        isLoading: false,
                    });


                })

                .catch(error =>{
                    console.log('err ' + error);
                    this.handleClick()
                    this.setState({hasMoreItems: false});
                });
*/