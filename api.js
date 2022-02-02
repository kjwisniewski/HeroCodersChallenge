/* APIRequest class
 *
 * An interface to perform calls to the Jira REST API
 * 
 */

import fetch from 'node-fetch';

const apiUrl = 'https://herocoders.atlassian.net/rest/api/3/';

function objectToQueryString(params) {
    return Object.keys(params)
        .map(key => {
            return key + '=' + encodeURIComponent(params[key]);
        })
        .join('&');
}

export default class APIRequest {
    constructor(APIEndpoint) {
        this.url = apiUrl + APIEndpoint;
    }

    call(params) {
        let queryString = '';
        if(params) {
            queryString = '?' + objectToQueryString(params);
        }

        console.log("Calling:", this.url + queryString);

        return fetch(this.url + queryString)
            .then(response => {
                console.log('Response status:', response.status);
                if(!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status}`);
                }
                return response.json();
            });
    }
}

