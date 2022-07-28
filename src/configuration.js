/* 
** This file contains most of the configuration for this app
*/

/* Dependencies */
import { startOfToday, add } from 'date-fns';
import loadDashboard from './components/dashboard/dashboard';
import loadInbox from './components/inboxView/inboxView';
import getList from './components/displayList/displayList';

/** 
 * @param {Object[]} sidebarEntries
 * @param {string} sidebarEntries[].name - The displaying name in sidebar
 * @param {string} sidebarEntries[].icon - The src path to icon displayed next to name. Icon must be in the same folder of the component
 * @param {boolean} sidebarEntries[].counter - Specify if a counter will be displayed next to name
 * @param {function} sidebarEntries[].fn - A function that will be executed when clicking on entry element
 * @param {Object.<Date>} [sidebarEntries[].startDate] - Specify the start interval date for filtering subtasks
 * @param {Object.<Date>} [sidebarEntries[].endDate] - Specify the end interval date for filtering subtasks
 */

export const sidebarEntries = [
    { name: 'Dashboard', icon: './icons8-dashboard-layout-100.png', counter: false, fn: loadDashboard },
    { name: 'Inbox', icon: './icons8-inbox-100.png', counter: true, fn: () => loadInbox(), startDate: startOfToday(), endDate: new Date() },
    { name: 'Today', icon: './icons8-today-100.png', counter: true, fn: (obj) => getList(obj), startDate: startOfToday(), endDate: add(startOfToday(), { hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Tomorrow', icon: './icons8-date-to-100.png', counter: true, fn: () => console.log("Tomorrow"), startDate: add(startOfToday(), { days: 1 }), endDate: add(startOfToday(), { days: 1, hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Upcoming', icon: './icons8-calendar-100.png', counter: true, fn: () => console.log("Upcoming"), startDate: add(startOfToday(), { days: 2 }), endDate: add(startOfToday(), { days: 13, hours: 23, minutes: 59, seconds: 59 }) },
    //{ name: 'Anytime', icon: './icons8-month-view-100.png', counter: true, fn: () => console.log("Anytime") },
];

/** 
 * @param {Object[]} dashboardColumns
 * @param {string} dashboardColumns[].name - Name of the column in dashboard page
 * @param {string} dashboardColumns[].id - ID used for adding unique id and class to element
 * @param {Object.<Date>} dashboardColumns[].startDate - Specify the start interval date for filtering subtasks
 * @param {Object.<Date>} dashboardColumns[].endDate - Specify the end interval date for filtering subtasks
 */

export const dashboardColumns = [
    { name: 'Today', id: 'today', startDate: startOfToday(), endDate: add(startOfToday(), { hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Tomorrow', id: 'tomorrow', startDate: add(startOfToday(), { days: 1 }), endDate: add(startOfToday(), { days: 1, hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Next 7 Days', id: 'week', startDate: add(startOfToday(), { days: 2 }), endDate: add(startOfToday(), { days: 6, hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Next 30 Days', id: 'month', startDate: add(startOfToday(), { days: 7 }), endDate: add(startOfToday(), { days: 30, hours: 23, minutes: 59, seconds: 59 }) },
];

/* Short date format to display in subtasks  */
export const dateFormat = "MMMM d'th,' yyyy";