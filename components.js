/* components.js
 *
 * responsible for fetching Jira components using APIRequest class
 *
 */

import APIRequest from './api.js';

function fetchComponents() {
    const apiRequest = new APIRequest('project/IC/components');
    console.log('Fetching components');
    return apiRequest.call();
}

function getComponentsHavingNoLead() {
    return fetchComponents()
        .then(components => {
            console.log('Components have been fetched.');
            let filteredComponentsById = {};
            components.forEach(component => {
                if(!component.lead || typeof component.lead !== 'object') {
                    filteredComponentsById[component.id] = {
                        id: component.id,
                        name: component.name
                    };
                }
            });
            return filteredComponentsById;
        });
}

export {getComponentsHavingNoLead}
