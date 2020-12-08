import { UPDATE_RECEIPT } from '../constants/updateReceipt.js';
export function updateReceipt(item, person, cost, receipt) {
    return {
        type: UPDATE_RECEIPT,
        payload: [item, person, cost, receipt]
    }
}