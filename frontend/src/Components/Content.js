import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import VerticalTimeline  from './VerticalTimeline';
import WorkIcon from '@material-ui/icons/Devices';
import Fab from '@material-ui/core/Fab';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';
import VerticalTimelineElement from './VerticalTimelineElement';
import './VerticalTimeline.css';
import './VerticalTimelineElement.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavigationIcon from '@material-ui/icons/Navigation';


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
      marginRight: 0
    }
});
class Content extends  React.Component{

    state = {
        news: [],
        isLoad: false
    }
    componentWillMount() {
        axios.get('http://localhost/awesomenewssiteever/public/', {
            crossDomain: true
        }).then(res => {
            this.setState({
                news: res.data.channel.item
            });
            console.log(res.data.channel.item);
            this.setState({isLoad: true})
        }).catch(error => {
            console.log('error', error);
        })

    }
    /*
    componentWillMount() {{this.FetchDataFromRssFeed()}
    }

    FetchDataFromRssFeed=()=> {
        var request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                var myObj = JSON.parse(request.responseText);

                    this.setState({
                        content: myObj.item[0]
                    });
                console.log(myObj);
            }
        }
        request.open("GET", "https://cors-anywhere.herokuapp.com/"+'https://news.yandex.ru/auto.rss', true);
        request.send();
    }*/
    getShortStr = (content) => {
        var arrStr = content.split('.');

        this.setState({
            content: [...this.state.content, arrStr[0]],
        });
        return arrStr[0];
    };
    getDate = (date) => {
       return date.slice(0, 22);
    }
    render(){
        const { classes } = this.props;
        return (
            <div>
            {
                this.state.isLoad ?
                <VerticalTimeline>
                    {this.state.news.map((item) =>(
                        <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={this.getDate(item.pubDate)}
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<WorkIcon />}
                        >
                        <h3 className="vertical-timeline-element-title">{item.title}</h3>
                        <h4 className="vertical-timeline-element-subtitle"></h4>
                        <p>
                            Автор: {item.author}
                        </p>
                            <Fab variant="extended" aria-label="Delete" className={classes.fab} href={item.guid}>
                                <NavigationIcon/>
                                Читать в источнике
                            </Fab>
                        </VerticalTimelineElement>
                    ))}
                    <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                        icon={<StarIcon />}
                    />
                </VerticalTimeline>
                    :
                    <CircularProgress  className={classes.loadicon} color="secondary" size={90}/>
            }
            </div>
    );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);