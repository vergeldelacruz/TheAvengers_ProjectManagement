import { API_URL } from "../../helpers/common";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const loginUser = (user) => async (dispatch) => {

  console.log("LOGIN ", API_URL)
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    //console.log(data);
    if (!data.errors) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: LOGIN_FAILED,
        payload: data.errors[0].msg,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = (user) => async (dispatch) => {

  console.log("REGISTER ", API_URL)
  try {
    const response = await fetch(`${API_URL}/signup`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),

    });
    const data = await response.json();
    //console.log(data);
    if (!data.errors) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: REGISTER_FAILED,
        payload: data.errors[0].msg,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
