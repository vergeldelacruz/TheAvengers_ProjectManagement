import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import commonReducer from './common/commonReducers';
import projectReducer from './admin/project/projectReducers';
import userReducer from './admin/user/userReducers';
import taskReducer from './admin/tasks/taskReducers';
import authReducer from './auth/authReducers';

const rootReducer = combineReducers({ 
    commonReducer,
    projectReducer,
    userReducer,
    taskReducer,
    authReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));