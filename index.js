/* index.js
 *
 * Retrieves a list of Jira components having no 'component lead' assigned,
 * along with the number of related issues
 * and outputs the result to console.
 *
 */

import {getComponentsHavingNoLead} from './components.js';
import {getIssuesByComponents} from './issues.js';

getComponentsHavingNoLead()
.then(components => getIssuesByComponents(components))
.then(componentsWithIssueList => {
    let resultsTable = Object.values(componentsWithIssueList)
        .map(({name, issues}) => ({name, 'issue count': issues.length || 0}));

    console.log('Components without \'lead\' field:');
    console.table(resultsTable, ['name', 'issue count']);
})
.catch(error => console.warn('Sorry, there\'s been an error.'));
