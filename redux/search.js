import * as ActionTypes from './ActionTypes';

export const search = (state  = { isLoading: true,
                                        errMess: null,
                                        search:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SEARCH:
            return {...state, isLoading: false, errMess: null, search: action.payload};

        case ActionTypes.SEARCH_LOADING:
            return {...state, isLoading: true, errMess: null, search: []}

        case ActionTypes.SEARCH_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};