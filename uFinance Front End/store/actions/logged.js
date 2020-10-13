import { LOGGED_CHANGE } from '../constants';
export function changeLogged(loggedin) {
    return {
        type: LOGGED_CHANGE,
        payload: loggedin
    }
}