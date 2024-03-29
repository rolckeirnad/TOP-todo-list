import events from '../../events';
import state from '../../state';
import projectElement from '../projectElement/projectElement';
import createPage from '../taskCreation/taskCreation';
import './projectView.css';

// Cache DOM
const _todosView = document.querySelector('#todos-view');

function deleteProject(project) {
    deleteAllChildrenTasks(project.tasks);
    const obj = {
        type: 'DELETE_TASK',
        key: 'projects',
        id: project.id,
    };
    events.emit('modify state', obj);
}

function deleteTask(task) {
    deleteAllChildrenSubtasks(task.subtasks);
    const obj = {
        type: 'DELETE_TASK',
        key: 'tasks',
        id: task.id,
    }
    events.emit('modify state', obj);
}

function deleteSubtask(id) {
    const obj = {
        type: 'DELETE_TASK',
        key: 'subtasks',
        id,
    }
    events.emit('modify state', obj);
}

function deleteAllChildrenSubtasks(ids) {
    for (const id of ids) {
        deleteSubtask(id);
    }
}

function deleteAllChildrenTasks(ids) {
    const tasks = state.getData('tasks');
    for (const id of ids) {
        const index = tasks.findIndex(task => task.id == id);
        // Get object and pass object
        deleteTask(tasks[index]);
    }
}

function createHeader(project) {
    const el = document.createElement('div');
    el.classList.add('project-view-header-container');
    // Create header with project title
    const header = document.createElement('h1');
    header.classList.add('project-view-header-title')
    header.textContent = project.name;
    // New task button
    const addButton = document.createElement('button');
    addButton.classList.add('project-view-header-add-button');
    addButton.setAttribute('type', 'button');
    addButton.innerText = "Add new task +";
    addButton.addEventListener('click', () => createPage('tasks', project.id));
    // New task button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('project-view-header-delete-button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.innerText = "Delete this project";
    deleteButton.addEventListener('click', () => deleteProject(project));

    el.append(header, addButton, deleteButton);
    return el;
}

function createContentContainer() {
    const el = document.createElement('div');
    el.classList.add('project-view-content-container');
    el.id = "projectViewMainContent"
    return el;
}

function setProject(project) {
    return function (arr) {
        const filteredData = arr.filter(task => project.tasks.includes(task.id));
        // Populate project
        const container = document.querySelector('#projectViewMainContent');
        container.replaceChildren();

        for (const task of filteredData) {
            const el = projectElement(task);
            container.appendChild(el);
        }
    }
}

function loadProjectView(project) {
    events.removeTempEvents();
    const newPage = createHeader(project);
    const newContentContainer = createContentContainer();
    // Load header
    _todosView.replaceChildren(newPage);
    _todosView.appendChild(newContentContainer);

    loadTasks = setProject(project);

    // Load tasks
    const data = state.getData('tasks');
    loadTasks(data);
    events.on('tasks updated', loadTasks, true);
}

let loadTasks;

export default loadProjectView;