import './sidebar.css';
import events from '../../events';
import { parse } from 'date-fns';
import createPage from '../taskCreation/taskCreation';
import { sidebarEntries } from '../../configuration';
import loadProjectView from '../projectView/projectView';
import state from '../../state';
import loadTaskView from '../taskView/taskView';

const icons = require.context(
    './',
    false,
    /\.(png|jpg|jpeg|gif)$/
);

function updateCounters(subtasksArr) {
    for (let entry of sidebarEntries) {
        if (entry.name == 'Inbox') {
            const subtasks = subtasksArr.filter(subtask => subtask.parentId == 0 && subtask.completed == false);
            const name = entry.name.toLowerCase();
            const counter = document.querySelector(`#${name}-Counter`);
            counter.textContent = subtasks.length;
        } else if (entry.counter) {
            const subtasks = subtasksArr.filter(subtask => {
                const subtaskDate = parse(subtask.dueDate, "MMMM d'th,' yyyy", new Date());
                return (subtask.completed == false) && entry.filter(entry, subtaskDate);
            })
            const name = entry.name.toLowerCase();
            const counter = document.querySelector(`#${name}-Counter`);
            counter.textContent = subtasks.length;
        }
    }
}

function updateProjects(projectsArr) {
    const projectsContainer = document.querySelector('#userEntries');
    const tasks = state.getData('tasks');
    projectsContainer.replaceChildren();
    for (let project of projectsArr) {
        const setProject = Object.assign(project, { icon: './icons8-box-100.png', fn: () => loadProjectView(project) });
        const mainProjectContainer = document.createElement('div');
        mainProjectContainer.classList.add('sidebar-project-container');
        const newLi = createLi(setProject);
        mainProjectContainer.append(newLi);
        const projectTasksContainer = document.createElement('div');
        projectTasksContainer.classList.add('sidebar-project-tasks-container');
        projectTasksContainer.id = `sidebar_${project.id}`;
        mainProjectContainer.appendChild(projectTasksContainer);
        projectsContainer.appendChild(mainProjectContainer);
    }
    updateTasks(tasks);
}

function updateTasks(tasksArr) {
    clearTasks();
    for (const task of tasksArr) {
        if (task.parentId) {
            const container = document.querySelector(`#sidebar_${task.parentId}`);
            const taskEntry = Object.assign({}, task, { icon: './icons8-folder-100.png', fn: () => loadTaskView(task) });
            const setTask = createLi(taskEntry);
            container.appendChild(setTask);
        }
    }
}

function clearTasks() {
    const containers = document.querySelectorAll('[id^=sidebar_]');
    for (const container of containers) {
        container.replaceChildren();
    }
}

function createLi(obj) {
    const lowerCaseName = obj.name.toLowerCase();
    const li = document.createElement('li');
    li.classList.add('default-entry');
    if (obj.id) {
        li.dataset.id = obj.id;
    } else {
        li.id = `${lowerCaseName}-Entry`;
    }
    li.addEventListener('click', () => obj.fn(obj));
    // Icon
    const setIcon = new Image();
    setIcon.src = icons(obj.icon);
    setIcon.classList.add('default-entry-icon');
    li.appendChild(setIcon);

    // Name
    const showingName = document.createElement('span');
    showingName.classList.add('entry-name');
    showingName.textContent = obj.name;
    li.appendChild(showingName);

    // Counter
    if (obj.counter) {
        const counterContainer = document.createElement('div');
        counterContainer.classList.add('entry-counter-container');

        const counter = document.createElement('span');
        counter.classList.add('entry-counter');
        counter.id = `${lowerCaseName}-Counter`;
        counter.textContent = '0';

        counterContainer.appendChild(counter);
        li.appendChild(counterContainer);
    }

    return li;
}

function sidebar() {
    const fr = document.createDocumentFragment();

    const defaultEntries = document.createElement('ul');
    defaultEntries.classList.add('default-entries');
    defaultEntries.id = 'defaultEntries';

    for (let entry of sidebarEntries) {
        const newLi = createLi(entry);
        defaultEntries.appendChild(newLi);
    }

    fr.appendChild(defaultEntries);

    const hr = document.createElement('hr');
    fr.appendChild(hr);

    const projectHeader = document.createElement('div');
    projectHeader.classList.add('sidebar-projects-header');

    const projectHeaderTitle = document.createElement('h2');
    projectHeaderTitle.textContent = "Projects";

    const projectHeaderButton = document.createElement('button');
    projectHeaderButton.classList.add('sidebar-header-button');
    projectHeaderButton.innerText = "+";
    projectHeaderButton.addEventListener('click', () => createPage('projects'));

    projectHeader.append(projectHeaderTitle, projectHeaderButton);

    fr.appendChild(projectHeader);

    const userEntries = document.createElement('ul');
    userEntries.classList.add('user-entries');
    userEntries.id = 'userEntries';

    fr.appendChild(userEntries);

    return fr;
}

events.on('subtasks loaded', updateCounters);
events.on('projects loaded', updateProjects);
events.on('subtasks updated', updateCounters);
events.on('projects updated', updateProjects);
events.on('tasks updated', updateTasks);

export default sidebar();