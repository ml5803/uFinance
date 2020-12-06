import { UPDATE_MEMBERS } from '../constants/updateMembers.js';
export function updateMembers(new_members, group_id) {
    return {
        type: UPDATE_MEMBERS,
        payload: [new_members, group_id]
    }
}