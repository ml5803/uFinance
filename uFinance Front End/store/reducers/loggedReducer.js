import { LOGGED_CHANGE } from '../constants';
const initialState = {
    loggedin: false,
};

const loggedReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGGED_CHANGE:
            return {
                ...state,
                loggedin: action.payload
            };
        default:
            return state;
    }
}
export default loggedReducer;