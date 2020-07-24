/**
 * Holds configuration info for interacting with any attached APIs.
 */
const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001/api/mongo',
    // osintApiUrl: process.env.OSINT_APP_API_URL || 'http://192.168.1.44:5000'
    osintApiUrl: process.env.OSINT_APP_API_URL || 'http://localhost:4000'
};

/**
 * 
 * @param {*} response 
 */
function handleHttpResponse(response) {
    return response.text().then(text => {
        if (response.status === 500) {
            console.error('HTTP 500: A server error was encountered.');
            console.error(text);
        }

        const data = text && JSON.parse(text);
        if (!response.ok) {

            if (response.status === 400) {
                if (data && data.errors) {
                    console.error('HTTP 400 Response: Validation error');
                    // iterate over data validation error(s) found in 'data'
                    Object.keys(data.errors).forEach(k => {
                        console.error(data.errors[k])
                    });
                }
            }

            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // authenticationService.logout();
                Location.reload(true);
            }

            if (response.status === 415) {
                console.error(`HTTP 415: ${response.statusText}`);
                console.error(`URL: ${response.url}`);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const handlers = {
    config,
    handleHttpResponse
};