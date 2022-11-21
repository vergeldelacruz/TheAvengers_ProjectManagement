import { API_URL } from "../../../helpers/common";

export const GET_USERS = 'GET_USERS';
export const GET_SINGLE_USERS = 'GET_SINGLE_USERS';
export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const getUsers = () => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        dispatch({ type: SET_USERS, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getSingleCategory = (id) => async dispatch => {
    dispatch({ 
        type: GET_SINGLE_USERS,
        payload: id
    });
}

export const setUsers = users => dispatch => {
    dispatch({
        type: SET_USERS,
        payload: users,
    });
};

export const addUser = user => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        if(!data.error) {
            dispatch({
                type: ADD_USER,
                payload: data.user,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = user => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        dispatch({
            type: UPDATE_USER,
            payload: user,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = user => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/user/${user._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log(data);
        if(!data.error) {
            dispatch({
                type: DELETE_USER,
                payload: user,
            });
        }
    } catch (error) {
        console.log(error);
    }
}