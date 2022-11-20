import { darkColors, lightColors } from "../../theme/colors";
import { CHANGE_THEME } from "./commonActions";

const initialState = {
  theme: lightColors,
};

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: state.theme == lightColors ? darkColors : lightColors };
    default:
      return state;
  }
}

export default commonReducer;
