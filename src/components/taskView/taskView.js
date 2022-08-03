import './taskView.css';
import createPage from '../taskCreation/taskCreation';
import events from '../../events';
import state from '../../state';

// Cache DOM
const _todosView = document.querySelector('#todos-view');

function addHeader(id, header) {
    const obj = {
        type: 'ADD_HEADER',
        key: 'tasks',
        id,
        value: header,
    }
    events.emit('modify state', obj);
}

function createHeaderContainer(header, id) {
    const container = document.createElement('div');
    container.classList.add('task-view-header-container');

    const headerName = document.createElement('h2');
    headerName.classList.add('task-view-header-container-name');
    headerName.textContent = header;

    const tasksContainer = document.createElement('div');
    tasksContainer.id = `${id}_${header}`;

    container.append(headerName, tasksContainer);

    return container;
}

function createTaskPage(task) {
    const el = document.createElement('div');
    el.classList.add('task-view-content-container');

    // A static container for task name and some button
    const sticky = document.createElement('div');
    sticky.classList.add('task-view-header-container');

    const headerTitle = document.createElement('h1');
    headerTitle.classList.add('task-view-header-title');
    headerTitle.textContent = task.name;

    // New task button
    const addButton = document.createElement('button');
    addButton.classList.add('task-view-header-add-button');
    addButton.setAttribute('type', 'button');
    addButton.innerText = "Add new subtask +";
    addButton.addEventListener('click', () => createPage('subtasks', task.id));

    // New header button
    const addHeaderButton = document.createElement('button');
    addHeaderButton.classList.add('task-view-header-add-header-button');
    addHeaderButton.setAttribute('type', 'button');
    addHeaderButton.innerText = "Add new header +";
    addHeaderButton.addEventListener('click', () => console.log("Show form to input header"));

    const optionsButton = document.createElement('button');
    optionsButton.setAttribute('type', 'button');
    optionsButton.classList.add('task-view-header-options-button');
    optionsButton.innerText = "...";
    sticky.append(headerTitle, addButton, addHeaderButton, optionsButton);

    const description = document.createElement('p');
    description.classList.add('task-view-task-description');
    description.textContent = task.description;

    const generalContainer = document.createElement('div');
    generalContainer.id = `general_container_${task.id}`;

    // Inside this container we'll create headers containers with subtasks
    const headerContainer = document.createElement('div');
    headerContainer.id = `header_container_${task.id}`;

    for (const header of task.headers) {
        // Create header container with id of '${task.id}_${task.header[]}'
        const newHeader = createHeaderContainer(header, task.id);
        headerContainer.appendChild(newHeader)
    }

    el.append(sticky, description, generalContainer, headerContainer);

    return el;
}

function createSubtaskElement(subtask) {
    const el = document.createElement('div');
    el.classList.add('task-view-subtask-element');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', () => console.log("Toggle state!"));

    const subtaskTitle = document.createElement('h3');
    subtaskTitle.classList.add('task-view-subtask-element-name');
    subtaskTitle.textContent = subtask.name;

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('task-view-subtask-element-icons-container');

    const optionsButton = document.createElement('button');
    optionsButton.setAttribute('type', 'button');
    optionsButton.classList.add('task-view-subtask-element-options-button');
    optionsButton.innerText = '...';

    el.append(checkbox, subtaskTitle, iconsContainer, optionsButton);

    return el;
}

function setTask(task) {
    return function (subtasks) {
        const filteredSubtasks = subtasks.filter(subtask => subtask.parentId == task.id);
        const generalContainer = document.querySelector('[id^=general_container_]');
        generalContainer.replaceChildren();
        const headersContainer = document.querySelector('[id^=header_container_]');//
        const headersList = headersContainer.childNodes;
        for (const header of headersList) header.replaceChildren();

        for (const subtask of filteredSubtasks) {
            // Create subtask element
            const subtaskEl = createSubtaskElement(subtask);
            console.log(subtask);
            if (subtask.header === null) {
                // If there's not header name append it to general container
                generalContainer.appendChild(subtaskEl);
            } else {
                // Else append it to corresponding header container
                const destination = document.querySelector(`${task.id}_${subtask.header}`);
                destination.appendChild(subtaskEl);
            }
        }


    }
}

function loadTaskView(task) {
    events.removeTempEvents();
    const newPage = createTaskPage(task);

    _todosView.replaceChildren(newPage);
    loadSubtasks = setTask(task);

    const data = state.getData('subtasks');
    loadSubtasks(data);

    //events.on('subtasks updated', loadSubtasks, true);
}

let loadSubtasks;

export default loadTaskView;