import * as actionTypes from './actionType';
import axios from 'axios';
import {authCheckState} from "./auth";

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
        if( arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value ) ){

            arr.splice(i,1);

        }
    }
    return arr;
}

export function newsHasErrored(bool) {
    return {
        type: actionTypes.NEWS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function newsIsLoading(bool) {
    return {
        type: actionTypes.NEWS_IS_LOADING,
        isLoading: bool
    };
}

export function newsGetDataSuccess(news) {
    return {
        type: actionTypes.NEWS_GET_DATA_SUCCESS,
        news
    };
}

export function setCategories(categories) {

    return {
        type: actionTypes.SET_CATEGORIES,
        categories
    };
}
export function updateCategories(categories) {

    return {
        type: actionTypes.UPDATE_CATEGORIES,
        categories
    };
}
export function setLocalCategories(categories) {
    return (dispatch) => {
        dispatch(setCategories(categories));
        console.log(categories);

        var category = JSON.parse(localStorage.getItem('categories'));
        category.push(categories);
        //category.concat(JSON.stringify(categories));

        localStorage.setItem('categories', JSON.stringify(category));
        //localStorage.setItem('categories', JSON.stringify(this.state.categories));

        const categorys = JSON.parse(localStorage.getItem('categories'));
    }
}
export function deleteCategories(categories) {
    return (dispatch) => {


        var category = JSON.parse(localStorage.getItem('categories'));

        removeByAttr(category, 'key', categories.key);
        //category.concat(JSON.stringify(categories));

        localStorage.setItem('categories', JSON.stringify(category));
        //localStorage.setItem('categories', JSON.stringify(this.state.categories));

        const categorys = JSON.parse(localStorage.getItem('categories'));

        dispatch(updateCategories(category));
    }
}
/*
export function newsGetData() {
    return (dispatch) => {
        dispatch(authCheckState());
        dispatch(newsIsLoading(true));
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        axios.get("https://cors-anywhere.herokuapp.com/"+ 'http://84.201.147.3:8080/index.php/api/RSS ', axiosConfig)
            .then((res) => {
                console.log(res.data.channel.item);
                localStorage.setItem('news', res.data.channel.item);
                return res;
        })
            .then((res) => res.data.channel.item)
            .then((news) => {
                dispatch(newsGetDataSuccess(news))

            })
            .catch(error => {
                dispatch(newsHasErrored(true));
                console.log('error', error);
        })
    };

}
*/

export function newsGetData() {
    return (dispatch) => {
        dispatch(newsIsLoading(true));

        axios.get('https://newsapi.org/v2/everything?q=apple&language=ru&sortBy=publishedAt&apiKey=4779ab0a6a4d40a292791c01f483dd0a', {
        })
            .then((res) => {
                //console.log("ddddddddddddddd");
                console.log(res.data.articles);
                //localStorage.setItem('news', res.data.articles[0]);
                return res;
            })
            .then((res) => res.data.articles)
            .then((news) => {
                    dispatch(newsGetDataSuccess(news));

            })
            .catch(error => {
                dispatch(newsHasErrored(true));
                console.log('error', error);
            })
    };

}