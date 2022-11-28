import { API_URL } from "../../../helpers/common";

export const GET_TASKS = 'GET_TASKS';
export const GET_SINGLE_TASKS = 'GET_SINGLE_TASKS';
export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const getTask = () => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        dispatch({ type: SET_TASKS, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getSingleTask = (id) => async dispatch => {
    dispatch({ 
        type: GET_SINGLE_TASKS,
        payload: id
    });
}

export const setTask = tasks => dispatch => {
    dispatch({
        type: SET_TASKS,
        payload: tasks,
    });
};

export const addTask = task => async dispatch => {
    try {
        let projectId = task.projectId;
        const response = await fetch(`${API_URL}/project/${projectId}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        //console.log(data);
        if(!data.errors){
            dispatch({
                type: ADD_TASK,
                payload: data,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateTask = task => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/task/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        //console.log(data);
        if(!data.errors){
            dispatch({
                type: UPDATE_TASK,
                payload: data,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = task => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/task/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        //console.log(data);
        dispatch({
            type: DELETE_TASK,
            payload: task,
        });
    } catch (error) {
        console.log(error);
    }
}