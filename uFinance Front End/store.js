import { createStore, combineReducers } from 'redux';
import loggedReducer from './store/reducers/loggedReducer.js';

const rootReducer = combineReducers(
    { loggedin: loggedReducer,
      userid: loggedReducer}
);
const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;