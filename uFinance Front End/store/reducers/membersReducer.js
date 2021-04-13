import { UPDATE_MEMBERS } from '../constants/updateMembers.js';
const initialState = {
    members: {},
    group_id: null,
    venmo_ids: {},
};

const membersReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_MEMBERS:
            return {
                ...state,
                members: action.payload[0],
                group_id: action.payload[1],
                venmo_ids: action.payload[2]

            };
        default:
            return state;
    }
}
export default membersReducer;