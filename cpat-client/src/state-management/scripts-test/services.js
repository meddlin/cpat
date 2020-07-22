import { handlers } from '../../state-management/helpers/http-response-handler';

export const scriptsTestService = {
    requestNmap
};

// function requestNmap() {
//     const requestOptions = {
//         method: 'GET',
//         // headers: { 'Content-Type': 'application/text' },
//         // body: JSON.stringify({ json: '-v' })
//     };

//     return fetch(`${handlers.config.osintApiUrl}/test-google`, requestOptions).then(handlers.handleHttpResponse);
// }

function requestNmap() {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        // headers: { 'Content-Type': 'application/text' },
        // body: JSON.stringify({ json: '-v' })
    };

    return fetch(`${handlers.config.osintApiUrl}/nmap`, requestOptions).then(handlers.handleHttpResponse);
}