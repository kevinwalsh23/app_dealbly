import * as ActionTypes from './ActionTypes';

export const rests = (state  = { isLoading: true,
                                        errMess: null,
                                        rests:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RESTS:
            return {...state, isLoading: false, errMess: null, rests: action.payload};

        case ActionTypes.RESTS_LOADING:
            return {...state, isLoading: true, errMess: null, rests: []}

        case ActionTypes.RESTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};