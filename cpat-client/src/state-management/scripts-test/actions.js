import { scriptsTestConstants } from './constants';
import { scriptsTestService } from './services';

export const scriptsTestActions = {
    startNmap,
};

function startNmap() {
    return dispatch => {
        dispatch(request());

        scriptsTestService.requestNmap()
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: scriptsTestConstants.START_NMAP_REQUEST } }
    function success(result) { return { type: scriptsTestConstants.START_NMAP_SUCCESS, result } }
    function failure(error) { return { type: scriptsTestConstants.START_NMAP_FAILURE, error } }
}