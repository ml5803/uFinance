import { GROUP_UPDATED } from '../constants/updateGroupConstants.js';
const initialState = {
    updated: false,
};

const updateGroupReducer = (state = initialState, action) => {
    switch(action.type) {
        case GROUP_UPDATED:
            return {
                ...state,
                updated: action.payload
            };
        default:
            return state;
    }
}
export default updateGroupReducer;