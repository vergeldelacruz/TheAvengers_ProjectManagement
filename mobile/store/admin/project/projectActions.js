import { API_URL } from "../../../helpers/common";

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_SINGLE_PROJECTS = 'GET_SINGLE_PROJECTS';
export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const getProjects = () => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        dispatch({ type: SET_PROJECTS, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getSingleTask = (id) => async dispatch => {
    dispatch({ 
        type: GET_SINGLE_PROJECTS,
        payload: id
    });
}

export const setProjects = projects => dispatch => {
    dispatch({
        type: SET_PROJECTS,
        payload: projects,
    });
};

export const addProject = project => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });
        const data = await response.json();
        if(!data.errors){
            dispatch({
                type: ADD_PROJECT,
                payload: data,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateProject = project => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/project/${project._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });
        const data = await response.json();
        if(!data.errors){
            dispatch({
                type: UPDATE_PROJECT,
                payload: data,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteProject = project => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/project/${project._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });
        const data = await response.json();
        console.log(data);
        dispatch({
            type: DELETE_PROJECT,
            payload: project,
        });
    } catch (error) {
        console.log(error);
    }
}