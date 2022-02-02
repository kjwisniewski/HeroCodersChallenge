/* issues.js
 *
 * responsible for fetching Jira issues using APIRequest class
 *
 */

import APIRequest from './api.js';

function fetchIssues(startAt = 0) {
    console.log('Fetching issues chunk, startAt', startAt);

    const queryParams = {
        'jql': 'project = IC and component is not empty',
        'fields': 'id,components',
        'maxResults': 100,
        'startAt': startAt
    };

    const apiRequest = new APIRequest('search');
    return apiRequest.call(queryParams);
}

function getIssuesHavingComponentAssigned(issues = []) {
    let startAt = issues.length;
    return fetchIssues(startAt)
        .then(json => {
            issues = issues.concat(json.issues);
            console.log('total:', json.total, 'fetched', issues.length);
            if(json.issues.length === 0 || issues.length >= json.total) {
                console.log('All issues have been fetched.');
                return issues;
            }
            return getIssuesHavingComponentAssigned(issues)
        });
}

function getIssuesByComponents(components) {
    if(!components || components.length === 0) {
        return Promise.resolve(components);
    }
    return getIssuesHavingComponentAssigned()
        .then(issues => {
            issues.forEach(issue => {
                issue.fields.components.forEach(component => {
                    if(components[component.id]) {
                        if(!components[component.id].issues) {
                            components[component.id].issues = [];
                        }
                        components[component.id].issues.push(issue.id);
                    }
                });
            });
            return components;
        });
}

export {getIssuesByComponents}
