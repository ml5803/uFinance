import { LOGGED_CHANGE } from '../constants';
export function changeLogged(loggedin, userid) {
    return {
        type: LOGGED_CHANGE,
        payload: [loggedin, userid]
    }
}