import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { deals } from './deals';
import { rests } from './rests';
import { barinfo } from './barinfo';
import { search } from './search';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({            
            deals,
            rests,
            barinfo,
            search
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}