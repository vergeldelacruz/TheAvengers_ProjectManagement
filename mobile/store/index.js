import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import commonReducer from './common/commonReducers';
import projectReducer from './admin/project/projectReducers';
import userReducer from './admin/user/userReducers';

const rootReducer = combineReducers({ 
    commonReducer,
    projectReducer,
    userReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));