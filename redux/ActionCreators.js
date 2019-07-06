import * as ActionTypes from './ActionTypes';
import { baseUrl, dealbly_api } from '../shared/baseUrl';

export const fetchDeals = () => (dispatch) => {
    
    dispatch(dealsLoading());

    return fetch(dealbly_api)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(deals => dispatch(addDeals(deals)))
    .catch(error => dispatch(dealsFailed(error.message)));
};

export const dealsLoading = () => ({
    type: ActionTypes.DEALS_LOADING
});

export const dealsFailed = (errmess) => ({
    type: ActionTypes.DEALS_FAILED,
    payload: errmess
});

export const addDeals = (deals) => ({
    type: ActionTypes.ADD_DEALS,
    payload: deals
});

export const fetchRests = () => (dispatch) => {
    
    dispatch(restsLoading());

    return fetch(dealbly_api + 'rests')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(rests => dispatch(addRests(rests)))
    .catch(error => dispatch(restsFailed(error.message)));
};

export const restsLoading = () => ({
    type: ActionTypes.RESTS_LOADING
});

export const restsFailed = (errmess) => ({
    type: ActionTypes.RESTS_FAILED,
    payload: errmess
});

export const addRests = (rests) => ({
    type: ActionTypes.ADD_RESTS,
    payload: rests
});

export const fetchBarInfo = (barname) => (dispatch) => {
    

    dispatch(barinfoLoading());    

    return fetch(dealbly_api + 'bar/' + barname)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(barinfo => dispatch(addBarinfo(barinfo)))
    .catch(error => dispatch(barinfoFailed(error.message)));
};


export const barinfoLoading = () => ({
    type: ActionTypes.BARINFO_LOADING
});

export const barinfoFailed = (errmess) => ({
    type: ActionTypes.BARINFO_FAILED,
    payload: errmess
});

export const addBarinfo = (barinfo) => ({
    type: ActionTypes.ADD_BARINFO,
    payload: barinfo
});

export const fetchSearch = (search) => (dispatch) => {
    

    dispatch(searchLoading());    
    return fetch(dealbly_api + 'search?' + 'start_time=' + search.start_time + '&end_time=' + search.end_time + '&day=' + search.day + '&keyword=' + search.keyword.trim() + '&zipnasty=' + search.zipnasty.trim())
    .then(response => {
        if (response.ok) {            
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(search => dispatch(addSearch(search)))
    .catch(error => dispatch(searchFailed(error.message)));
};


export const searchLoading = () => ({
    type: ActionTypes.SEARCH_LOADING
});

export const searchFailed = (errmess) => ({
    type: ActionTypes.SEARCH_FAILED,
    payload: errmess
});

export const addSearch = (search) => ({
    type: ActionTypes.ADD_SEARCH,
    payload: search
});