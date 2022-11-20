import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import commonReducer from './common/commonReducers';

const rootReducer = combineReducers({ 
    commonReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));