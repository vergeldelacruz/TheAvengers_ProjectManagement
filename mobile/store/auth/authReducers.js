import { LOGIN_SUCCESS, LOGIN_FAILED } from "./authActions";
import { REGISTER_SUCCESS, REGISTER_FAILED } from "./authActions";

const initialState = {
  auth: null,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, auth: action.payload };
    case LOGIN_FAILED:
      return { ...state, auth: null, error: action.payload };
    case REGISTER_SUCCESS:
      return { ...state, auth: action.payload };
    case REGISTER_FAILED:
      return { ...state, auth: null, error: action.payload };
    default:
      return state;
  }
}


export default authReducer;
