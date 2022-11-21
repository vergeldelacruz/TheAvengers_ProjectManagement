import { ADD_USER, DELETE_USER, GET_SINGLE_USERS, SET_USERS, UPDATE_USER } from "./userActions";

const initialState = {
  users: [],
  selectedUser: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_USERS:
        return {...state, selectedUser: state.users.filter(user => user._id === action.payload)};
    case SET_USERS:
      return { ...state, users: action.payload };
    case ADD_USER:
        return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
        return { ...state, users: state.users.map(user => user._id === action.payload._id ? action.payload : user) };
    case DELETE_USER:
        return { ...state, users: state.users.filter(user => user._id !== action.payload._id) };
    default:
      return state;
  }
}

export default userReducer;
