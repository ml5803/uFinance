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
                cost: action.payload[0],
                item: action.payload[1],
                url: action.payload[2]

            };
        default:
            return state;
    }
}
export default receiptReducer;