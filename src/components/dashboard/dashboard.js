import './dashboard.css';
import first from '../first/first';
import events from '../../events';
import state from '../../state';
import { startOfToday, add, parse, isWithinInterval } from 'date-fns';
import dashboardCard from '../dashboardCard/dashboardCard';

// This could be loaded from a configuration file
const columns = [
    { name: 'Today', id: 'today', startDate: startOfToday(), endDate: add(startOfToday(), { hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Tomorrow', id: 'tomorrow', startDate: add(startOfToday(), { days: 1 }), endDate: add(startOfToday(), { days: 1, hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Next 7 Days', id: 'week', startDate: add(startOfToday(), { days: 2 }), endDate: add(startOfToday(), { days: 6, hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Next 30 Days', id: 'month', startDate: add(startOfToday(), { days: 7 }), endDate: add(startOfToday(), { days: 30, hours: 23, minutes: 59, seconds: 59 }) },
];

const todosView = document.querySelector('#todos-view');

function dashboard() {
    const el = document.createElement('div');
    el.classList.add('dashboard-container');

    for (let column of columns) {
        const columnContainer = document.createElement('div');
        columnContainer.classList.add('dashboard-column');
        columnContainer.id = `dashboard-${column.id}`;

        const headerContainer = document.createElement('div');
        headerContainer.classList.add(`dashboard-header-${column.id}`);

        const header = document.createElement('h1');
        header.classList.add("dashboard-header", `${column.id}`);
        header.textContent = column.name;
        headerContainer.appendChild(header);
        columnContainer.appendChild(headerContainer);

        const taskContainer = document.createElement('div');
        taskContainer.id = `dashboard-${column.id}-tasks`;
        taskContainer.classList.add('dashboard-task-container');
        columnContainer.appendChild(taskContainer);

        el.appendChild(columnContainer);
    }

    return el;
}

function cacheElements() {
    let cached = {};
    for (let element of columns) {
        const el = document.querySelector(`#dashboard-${element.id}-tasks`);
        Object.assign(cached, { [element.id]: el })
    }
    return cached;
}

function loadSubtasks(subtasksArr) {
    const taskContainer = cacheElements();
    for (let column of columns) {
        // Filter data and get elements based on start and end dates
        const filteredData = subtasksArr.filter(subtask => {
            const subtaskDate = parse(subtask.dueDate, "MMMM d'th,' yyyy", new Date());
            return (subtask.completed == false) && isWithinInterval(subtaskDate, {
                start: column.startDate,
                end: column.endDate,
            });
        });
        for (let subtask of filteredData) {
            // For every element in array, create a new Node element
            const el = dashboardCard(subtask);
            // Append element to its corresponding column
            taskContainer[column.id].appendChild(el);
        }
    }
}

function loadDashboard() {
    const subtasks = state.getData('subtasks');
    if (subtasks.length > 0) {
        events.off('subtasks updated', loadDashboard);
        const dash = dashboard();
        todosView.replaceChildren(dash);
        loadSubtasks(subtasks);
    } else {
        events.on('subtasks updated', loadDashboard);
        todosView.replaceChildren(first);
    }
}

events.on('initial view', loadDashboard);

export default loadDashboard;