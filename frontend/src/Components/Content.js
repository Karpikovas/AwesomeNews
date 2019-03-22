import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import VerticalTimeline  from './VerticalTimeline';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';
import VerticalTimelineElement from './VerticalTimelineElement';
import './VerticalTimeline.css';
import './VerticalTimelineElement.css';
import Chip from "./Header";

let Parser = require('rss-parser');
let parser = new Parser();

(async () => {

    let feed = await parser.parseURL('http://localhost/awesomenewssiteever/public/index.php/RSS');
    console.log(feed.title);

    feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
    });

})();
const styles = theme => ({
    content:{
        background: 'blue',
    }
});
class Content extends  React.Component{

    state = {
        news: [],
        content:[]
    }
    componentWillMount() {/*
        fetch('http://localhost/awesomenewssiteever/public/Yandex.json')
            .then((response) => {
                console.log(response);
            })

            .catch((error) => {
                console.error(error);
            });*/
        /*axios
            .get('http://localhost/awesomenewssiteever/public/Yandex.json')
            .then(({ data }) => {
                this.setState({
                    news: data
                });
                console.log(data);
            });*/
    }/*
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
        /*
        this.setState({
            content: [...this.state.content, arrStr[0]],
        });*/
        return arrStr[0];
    };
    render(){
        const { classes } = this.props;
        return (
        <VerticalTimeline>
            {this.state.news.map(item => (
                <VerticalTimelineElement
                    key = {item.title}
                    className="vertical-timeline-element--work"
                    date="2011 - present"
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<WorkIcon />}
                >
                    <div>
                        <h3 className="vertical-timeline-element-title">{item.title}</h3>
                        <h4 className="vertical-timeline-element-subtitle"></h4>
                        <p >
                            {this.getShortStr(item.content)}...
                        </p>
                    </div>
                </VerticalTimelineElement>
                ))}

            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2010 - 2011"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<WorkIcon />}
            >
                <h3 className="vertical-timeline-element-title">Art Director</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                    Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2008 - 2010"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<WorkIcon />}
            >
                <h3 className="vertical-timeline-element-title">Web Designer</h3>
                <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                <p>
                    User Experience, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2006 - 2008"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<WorkIcon />}
            >
                <h3 className="vertical-timeline-element-title">Web Designer</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                    User Experience, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="April 2013"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                icon={<SchoolIcon />}
            >
                <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                <p>
                    Strategy, Social Media
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="November 2012"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                icon={<SchoolIcon />}
            >
                <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                <p>
                    Creative Direction, User Experience, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="2002 - 2006"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                icon={<SchoolIcon />}
            >
                <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                <p>
                    Creative Direction, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                icon={<StarIcon />}
            />
        </VerticalTimeline>
    );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);