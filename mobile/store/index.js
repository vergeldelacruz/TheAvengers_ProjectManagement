import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import commonReducer from './common/commonReducers';
import projectReducer from './admin/project/projectReducers';

const rootReducer = combineReducers({ 
    commonReducer,
    projectReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));