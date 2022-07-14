import './listView.css';
import state from '../../state';
import listElement from '../listElement/listElement';
import createPage from '../taskCreation/taskCreation';

// Maybe it's convenient to group with days
// Fri May 8
// Sat May 9 ... etc
const columns = [
    { name: 'Expired', id: 'expired', startDate: null, endDate: startOfToday() },
    { name: 'Today', id: 'today', startDate: startOfToday(), endDate: add(startOfToday(), { hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Tomorrow', id: 'tomorrow', startDate: add(startOfToday(), { days: 1 }), endDate: add(startOfToday(), { days: 1, hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Upcoming', id: 'upcoming', startDate: add(startOfToday(), { days: 2 }), endDate: null },
];

const _todosView = document.querySelector('#todos-view');

function list(type, fn) {
    const el = document.createElement('div');
    el.setAttribute('id', 'listView');

    // Back logo, header text, options
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('list-header-container');

    const headerText = document.createElement('h1');
    headerText.classList.add('list-header');
    headerText.textContent = type;              //Selected option

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
        
        columnEl.append(columnHeader,taskContainer);

        tasksContainer.appendChild(columnEl);
    }

    el.append(headerContainer, tasksContainer);
    return el;
}


function loadList(type, fn) {
    const newList = list(type, fn);
    _todosView.replaceChildren(newList);
}

export default loadList;