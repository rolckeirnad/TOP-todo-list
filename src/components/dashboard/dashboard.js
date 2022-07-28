import './dashboard.css';
import first from '../first/first';
import events from '../../events';
import state from '../../state';
import { parse, isWithinInterval } from 'date-fns';
import dashboardCard from '../dashboardCard/dashboardCard';
import { dashboardColumns } from '../../configuration';
import { dateFormat } from '../../configuration';

const todosView = document.querySelector('#todos-view');

function dashboard() {
    const el = document.createElement('div');
    el.classList.add('dashboard-container');

    for (let column of dashboardColumns) {
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
    for (let element of dashboardColumns) {
        const el = document.querySelector(`#dashboard-${element.id}-tasks`);
        Object.assign(cached, { [element.id]: el })
    }
    return cached;
}

function loadSubtasks(subtasksArr) {
    const taskContainer = cacheElements();
    for (let column of dashboardColumns) {
        // Filter data and get elements based on start and end dates
        const filteredData = subtasksArr.filter(subtask => {
            const subtaskDate = parse(subtask.dueDate, dateFormat, new Date());
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

function loadDashboard(arr = null) {
    events.removeTempEvents();
    const subtasks = arr ? state.getData('subtasks') : arr;
    if (subtasks.length > 0) {
        events.removeTempEvents();
        const dash = dashboard();
        todosView.replaceChildren(dash);
        loadSubtasks(subtasks);
    } else {
        events.on('subtasks updated', loadDashboard, true);
        todosView.replaceChildren(first);
    }
}

events.on('initial view', loadDashboard, true);

export default loadDashboard;