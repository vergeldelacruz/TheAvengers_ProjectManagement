import { ADD_TASK, DELETE_TASK, GET_SINGLE_TASKS, SET_TASKS, UPDATE_TASK } from "./taskActions";

const initialState = {
  tasks: [],
  selectedTask: null,
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_TASKS:
        return {...state, selectedTask: state.tasks.filter(task => task._id === action.payload)};
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
        return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE_TASK:
       console.log('updateTask');
       console.log(action.payload);
        return { ...state, tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task) };
    case DELETE_TASK:
        return { ...state, tasks: state.tasks.filter(task => task._id !== action.payload._id) };
    default:
      return state;
  }
}

export default taskReducer;
