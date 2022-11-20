import { setTheme } from "../../helpers/common";
import { darkColors, lightColors } from "../../theme/colors";
import { CHANGE_THEME } from "./commonActions";

const initialState = {
  theme: lightColors,
};

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME: {
      setTheme(state.theme == lightColors ? 'dark' : 'light');
      let theme = state.theme == lightColors ? darkColors : lightColors;
      if(action.payload) theme = action.payload == 'dark' ? darkColors : lightColors;
      return { ...state, theme: theme };
    }
    default:
      return state;
  }
}

export default commonReducer;
