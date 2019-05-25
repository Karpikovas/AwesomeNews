import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

/*
* 0 - Главные
* 1 - Политика
* 2 - Мир
* 3 - Авто
* 4 - Общество
* 5 - Музыка
* 6 - Спорт
* 7 - Технологии*/
const initialState = {
    token: null,
    news: [],
    hasErrored: false,
    isLoading: false,
    categories: [ ],
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
        //news: [...state.news, action.news]
    }
};

const setCategories = (state, action) => {
    return {
        categories: state.categories.concat(action.categories)
    }
};

const updateCategories = (state, action) => {
    return {
        categories: action.categories
    }
};

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
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_CATEGORIES: return setCategories(state, action);
        case actionTypes.UPDATE_CATEGORIES: return updateCategories(state, action);

        default:
            return state;
    }
};

export default reducer;