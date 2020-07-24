import { scriptsTestConstants } from './constants';

export function scriptsTest(state = {}, action) {
    switch(action.type) {
        case scriptsTestConstants.START_NMAP_REQUEST:
            return Object.assign([], state, {
                loading: true
            });
        case scriptsTestConstants.START_NMAP_SUCCESS:
            return Object.assign([], state, {
                loading: false,
                results: action.result
            });
        case scriptsTestConstants.START_NMAP_FAILURE:
            return Object.assign([], state, {
                loading: false,
            });
    }
};