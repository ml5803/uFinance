import { LOGGED_CHANGE } from '../constants';
const initialState = {
    loggedin: false,
    userid: null
};

const loggedReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGGED_CHANGE:
            return {
                ...state,
                loggedin: action.payload[0],
                userid: action.payload[1]
            };
        default:
            return state;
    }
}
export default loggedReducer;