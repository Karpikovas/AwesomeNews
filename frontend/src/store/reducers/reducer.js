import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    news: [],
    hasErrored: false,
    isLoading: false
};

const newsIsLoading = (state, action) => {
    return updateObject(state, {
        isLoading: true
    });
};


const newsHasErrored = (state, action) => {
    return updateObject(state, {
        hasErrored: true
    });
};

const newsGetDataSuccess = (state, action) => {
    return {
        isLoading: false,
        news: state.news.concat(action.news)
        //news: action.news
    }
}

const authStart = (state, action) => {
    return updateObject(state, {
        isLoading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        isLoading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });
};


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.NEWS_IS_LOADING: return newsIsLoading(state, action);
        case actionTypes.NEWS_HAS_ERRORED: return newsHasErrored(state, action);
        case actionTypes.NEWS_GET_DATA_SUCCESS: return newsGetDataSuccess(state, action);

        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

        default:
            return state;
    }
};

export default reducer;