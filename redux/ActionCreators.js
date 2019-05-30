import * as ActionTypes from './ActionTypes';
import { baseUrl, dealbly_api } from '../shared/baseUrl';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
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
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());
    return fetch(baseUrl + 'dishes')
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
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
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
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
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
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFavorite = (dishId)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 100);
};

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
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
                throw error;
            })
        
        .then(response => response.json())        
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log('post comments', error.message); alert('Your comment could not be posted\nError: ' + error.message); });
};

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
});

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
    //console.warn(barname);

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
    //console.warn(dealbly_api + 'search?' + 'start_time=' + search.start_time + '&end_time=' + search.end_time + '&day=' + search.day + '&keyword=' + search.keyword + '&zipnasty=' + search.zipnasty);    
    return fetch(dealbly_api + 'search?' + 'start_time=' + search.start_time + '&end_time=' + search.end_time + '&day=' + search.day + '&keyword=' + search.keyword + '&zipnasty=' + search.zipnasty)
    .then(response => {
        if (response.ok) {
            console.warn(response)
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