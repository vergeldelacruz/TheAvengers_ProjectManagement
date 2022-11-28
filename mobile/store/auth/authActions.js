import { API_URL } from "../../helpers/common";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const loginUser = (user) => async (dispatch) => {
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
