import './listView.css';
import state from '../../state';
import listElement from '../listElement/listElement';
import createPage from '../taskCreation/taskCreation';
import events from '../../events';
import { isBefore, isAfter, startOfToday, add, parse, isWithinInterval } from 'date-fns';

const columns = [
    { name: 'Expired', id: 'expired', startDate: null, endDate: startOfToday(), fn: (obj, date) => isBefore(date, obj.endDate) },
    { name: 'Today', id: 'today', startDate: startOfToday(), endDate: add(startOfToday(), { hours: 23, minutes: 59, seconds: 59 }), fn: intervalHelper },
    { name: 'Tomorrow', id: 'tomorrow', startDate: add(startOfToday(), { days: 1 }), endDate: add(startOfToday(), { days: 1, hours: 23, minutes: 59, seconds: 59 }), fn: intervalHelper },
    { name: 'Upcoming', id: 'upcoming', startDate: add(startOfToday(), { days: 2 }), endDate: null, fn: (obj, date) => isAfter(date, obj.startDate) },
];

const dateFormat = "MMMM d'th,' yyyy";

const dateInterface = (obj) => ({
    fn: (date, format) => {
        const parsedDate = parse(date, format, new Date());
        return obj.fn(obj, parsedDate);
    },
});

function intervalHelper(obj, date) {
    return isWithinInterval(date, {
        start: obj.startDate,
        end: obj.endDate,
    });
}

const _todosView = document.querySelector('#todos-view');

// One helper function using isWithinInterval and other using isAfter and isBefore
function filterArr(arr, fn) {

}

function list() {
    const el = document.createElement('div');
    el.setAttribute('id', 'listView');

    // Back logo, header text, options
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('list-header-container');

    const headerText = document.createElement('h1');
    headerText.classList.add('list-header');
    headerText.textContent = "Inbox";

    const addButton = document.createElement('button');
    addButton.classList.add('list-header-add-button');
    addButton.setAttribute('type', 'button');
    addButton.innerText = "Add new subtask +";
    addButton.addEventListener('click', () => createPage('subtasks'));

    headerContainer.append(headerText, addButton);

    const tasksContainer = document.createElement('div');
    tasksContainer.id = 'list-subtasks';
    tasksContainer.classList.add('list-tasks-columns-container');

    for (let each of columns) {
        const columnEl = document.createElement('div');
        columnEl.classList.add('list-tasks-container-column', `list-tasks-${each.id}-column`);

        const columnHeader = document.createElement('div');
        columnHeader.classList.add('list-tasks-column-header');

        const columnHeaderText = document.createElement('h1');
        columnHeaderText.classList.add('list-tasks-column-header-title');
        columnHeaderText.textContent = each.name;

        columnHeader.append(columnHeaderText);

        const taskContainer = document.createElement('div');
        taskContainer.id = `list-tasks-column-${each.id}`;
        taskContainer.classList.add('list-tasks-container');

        columnEl.append(columnHeader, taskContainer);

        tasksContainer.appendChild(columnEl);
    }

    el.append(headerContainer, tasksContainer);
    return el;
}

function loadSubtasks(subtasksArr) {
    // subtaskArr will be the same.
    // For each column we need to filter data according the object date
    for (let column of columns) {
        // Get column using querySelector
        const containerEl = document.querySelector(`#list-tasks-column-${column.id}`);
        containerEl.replaceChildren();
        // Get filter function with our interface from column object
        const filterInterface = dateInterface(column);
        // Get all elements which pass the filter function
        const filteredData = subtasksArr.filter(subtask => filterInterface.fn(subtask.dueDate, dateFormat));
        // For each element create a new card and append it to column
        for (const subtask of filteredData) {
            const subtaskEl = listElement(subtask);
            containerEl.appendChild(subtaskEl);
        }
    }
}

events.on('subtasks updated', loadSubtasks);

function loadList() {
    const newList = list();
    _todosView.replaceChildren(newList);
    const data = state.getData('subtasks');
    loadSubtasks(data);
}

export default loadList;