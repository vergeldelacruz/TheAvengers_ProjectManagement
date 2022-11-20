import { setTheme } from "../../helpers/common";

export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = () => dispatch => {
    dispatch({
        type: CHANGE_THEME,
        payload: null,
    });
};