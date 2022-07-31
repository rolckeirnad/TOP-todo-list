/* 
** This file contains most of the configuration for this app
*/

/* Dependencies */
import { startOfToday, add, isWithinInterval, isBefore, isAfter } from 'date-fns';
import loadDashboard from './components/dashboard/dashboard';
import loadInbox from './components/inboxView/inboxView';
import getList from './components/displayList/displayList';

/** 
 * @param {Object[]} sidebarEntries
 * @param {string} sidebarEntries[].name - The displaying name in sidebar
 * @param {string} sidebarEntries[].icon - The src path to icon displayed next to name. Icon must be in the same folder of the component
 * @param {boolean} sidebarEntries[].counter - Specify if a counter will be displayed next to name
 * @param {function} sidebarEntries[].fn - A function that will be executed when clicking on entry element
 * @param {function} sidebarEntries[].filter - A function to pass inside a filter method to keep only desired array elements
 * @param {Object.<Date>} [sidebarEntries[].startDate] - Specify the start interval date for filtering subtasks
 * @param {Object.<Date>} [sidebarEntries[].endDate] - Specify the end interval date for filtering subtasks
 */

export const sidebarEntries = [
    { name: 'Dashboard', icon: './icons8-dashboard-layout-100.png', counter: false, fn: loadDashboard },
    { name: 'Inbox', icon: './icons8-inbox-100.png', counter: true, fn: () => loadInbox(), startDate: startOfToday(), endDate: new Date() },
    { name: 'Today', icon: './icons8-today-100.png', counter: true, fn: (obj) => getList(obj), filter: intervalHelper, startDate: startOfToday(), endDate: add(startOfToday(), { hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Tomorrow', icon: './icons8-date-to-100.png', counter: true, fn: (obj) => getList(obj), filter: intervalHelper, startDate: add(startOfToday(), { days: 1 }), endDate: add(startOfToday(), { days: 1, hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Upcoming', icon: './icons8-calendar-100.png', counter: true, fn: (obj) => getList(obj), filter: (obj, date) => isAfter(date, obj.startDate), startDate: add(startOfToday(), { days: 1 }) },
    { name: 'Expired', icon: './icons8-month-view-100.png', counter: true, fn: (obj) => getList(obj), filter: (obj, date) => isBefore(date, obj.endDate), endDate: startOfToday() },
];
// This function is for keeping the format (obj,date) => someFunction()
function intervalHelper(obj, date) {
    return isWithinInterval(date, {
        start: obj.startDate,
        end: obj.endDate,
    });
}

/** 
 * @param {Object[]} dashboardColumns
 * @param {string} dashboardColumns[].name - Name of the column in dashboard page
 * @param {string} dashboardColumns[].id - ID used for adding unique id and class to element
 * @param {Object.<Date>} dashboardColumns[].startDate - Specify the start interval date for filtering subtasks
 * @param {Object.<Date>} dashboardColumns[].endDate - Specify the end interval date for filtering subtasks
 * @param {function} dashboardColumns[].filter - This function will filter the subtasks array inside column
 */

export const dashboardColumns = [
    { name: 'Expired', id: 'expired', startDate: null, endDate: startOfToday(), filter: (obj, date) => isBefore(date, obj.endDate) },
    { name: 'Today', id: 'today', startDate: startOfToday(), endDate: add(startOfToday(), { hours: 23, minutes: 59, seconds: 59 }), filter: intervalHelper, },
    { name: 'Tomorrow', id: 'tomorrow', startDate: add(startOfToday(), { days: 1 }), endDate: add(startOfToday(), { days: 1, hours: 23, minutes: 59, seconds: 59 }), filter: intervalHelper, },
    { name: 'Next 7 Days', id: 'week', startDate: add(startOfToday(), { days: 2 }), endDate: add(startOfToday(), { days: 6, hours: 23, minutes: 59, seconds: 59 }), filter: intervalHelper, },
];

/* Short date format to display in subtasks  */
export const shortDate = "dd MMM";
export const dateFormat = "MMMM d'th,' yyyy";
export const longDate = "EEEE, dd MMMM";