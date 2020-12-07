import { createStore, combineReducers } from 'redux';
import loggedReducer from './store/reducers/loggedReducer.js';
import updateGroupReducer from './store/reducers/updateGroupReducer.js'
import membersReducer from './store/reducers/membersReducer.js'
import receiptReducer from './store/reducers/receiptReducer.js'

const rootReducer = combineReducers(
    { 
        loggedin: loggedReducer,
        userid: loggedReducer,
        updated: updateGroupReducer, 
        members: membersReducer,
        receipt: receiptReducer,
    }
);
const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;