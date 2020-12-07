import { UPDATE_RECEIPT } from '../constants/updateReceipt.js';
export function updateReceipt(cost, item) {
    return {
        type: UPDATE_RECEIPT,
        payload: [cost, item, url]
    }
}