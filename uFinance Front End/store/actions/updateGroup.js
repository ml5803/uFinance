import { GROUP_UPDATED } from '../constants/updateGroupConstants';
export function changeUpdateStatus(updated) {
    return {
        type: GROUP_UPDATED,
        payload: updated
    }
}