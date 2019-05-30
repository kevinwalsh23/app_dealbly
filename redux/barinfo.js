import * as ActionTypes from './ActionTypes';

export const barinfo = (state  = { isLoading: true,
                                        errMess: null,
                                        barinfo:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BARINFO:
            return {...state, isLoading: false, errMess: null, barinfo: action.payload};

        case ActionTypes.BARINFO_LOADING:
            return {...state, isLoading: true, errMess: null, barinfo: []}

        case ActionTypes.BARINFO_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};