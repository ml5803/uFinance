import { UPDATE_RECEIPT } from '../constants/updateReceipt.js';
const initialState = {
    cost: '',
    item: '',
    url: '',
};

const receiptReducer = (state = initialState, action) => {
    switch(action.type) {
          case UPDATE_RECEIPT:
            return {
                ...state,
                item: action.payload[0],
                person: action.payload[1],
                cost: action.payload[2],
                receipt: action.payload[3],

            };
        default:
            return state;
    }
}
export default receiptReducer;