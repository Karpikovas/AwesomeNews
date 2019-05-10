import * as actionTypes from './actionType';
import axios from 'axios';

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

export function newsGetData() {
    return (dispatch) => {
        dispatch(newsIsLoading(true));

        axios.get('http://84.201.146.169/ANS2/awesomenewssiteever/public/', {
            crossDomain: true
        })
            .then((res) => {
                //console.log(res.data.channel.item);
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