import { ADD_PROJECT, DELETE_PROJECT, GET_SINGLE_PROJECTS, SET_PROJECTS, UPDATE_PROJECT } from "./projectActions";

const initialState = {
  projects: [],
  selectedProject: null,
};

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PROJECTS:
        return {...state, selectedProject: state.projects.filter(project => project.id === action.payload)};
    case SET_PROJECTS:
      return { ...state, projects: action.payload };
    case ADD_PROJECT:
        return { ...state, projects: [...state.projects, action.payload] };
    case UPDATE_PROJECT:
        return { ...state, projects: state.projects.map(project => project.id === action.payload.id ? action.payload : project) };
    case DELETE_PROJECT:
        return { ...state, projects: state.projects.filter(project => project.id !== action.payload.id) };
    default:
      return state;
  }
}

export default projectReducer;
