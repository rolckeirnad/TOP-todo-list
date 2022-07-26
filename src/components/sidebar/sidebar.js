import './sidebar.css';
import events from '../../events';
import { startOfToday, parse, add, isWithinInterval } from 'date-fns';
import createPage from '../taskCreation/taskCreation';
import loadDashboard from '../dashboard/dashboard';
import loadInbox from '../inboxView/inboxView';

// Test data - This will replaced with state and some file configuration
const defEntries = [
    { name: 'Dashboard', icon: './icons8-dashboard-layout-100.png', counter: false, fn: loadDashboard },
    { name: 'Inbox', icon: './icons8-inbox-100.png', counter: true, fn: () => loadInbox("Inbox", subtask => subtask.parentId == 0), startDate: startOfToday(), endDate: new Date() },
    { name: 'Today', icon: './icons8-today-100.png', counter: true, fn: () => console.log("Today"), startDate: startOfToday(), endDate: add(startOfToday(), { hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Tomorrow', icon: './icons8-date-to-100.png', counter: true, fn: () => console.log("Tomorrow"), startDate: add(startOfToday(), { days: 1 }), endDate: add(startOfToday(), { days: 1, hours: 23, minutes: 59, seconds: 59 }) },
    { name: 'Upcoming', icon: './icons8-calendar-100.png', counter: true, fn: () => console.log("Upcoming"), startDate: add(startOfToday(), { days: 2 }), endDate: add(startOfToday(), { days: 13, hours: 23, minutes: 59, seconds: 59 }) },
    //{ name: 'Anytime', icon: './icons8-month-view-100.png', counter: true, fn: () => console.log("Anytime") },
];
// End of Test data

const icons = require.context(
    './',
    false,
    /\.(png|jpg|jpeg|gif)$/
);

const _todoView = document.querySelector('#todos-view');

function updateCounters(subtasksArr) {
    for (let entry of defEntries) {
        if (entry.name == 'Inbox') {
            const subtasks = subtasksArr.filter(subtask => subtask.parentId == 0 && subtask.completed == false);
            const name = entry.name.toLowerCase();
            const counter = document.querySelector(`#${name}-Counter`);
            counter.textContent = subtasks.length;
        } else if (entry.counter) {
            const startDate = entry.startDate;
            const endDate = entry.endDate
            const subtasks = subtasksArr.filter(subtask => {
                const subtaskDate = parse(subtask.dueDate, "MMMM d'th,' yyyy", new Date());
                return (subtask.completed == false) && isWithinInterval(subtaskDate, {
                    start: startDate,
                    end: endDate,
                });
            })
            const name = entry.name.toLowerCase();
            const counter = document.querySelector(`#${name}-Counter`);
            counter.textContent = subtasks.length;
        }
    }
}

function updateProjects(projectsArr) {
    const projectsContainer = document.querySelector('#userEntries');
    projectsContainer.replaceChildren();
    for (let project of projectsArr) {
        const setProject = Object.assign(project, { icon: './icons8-box-100.png' });
        const newLi = createLi(setProject);
        projectsContainer.appendChild(newLi);
    }

}

function createLi(obj) {
    const lowerCaseName = obj.name.toLowerCase();
    const li = document.createElement('li');
    li.classList.add('default-entry');
    li.id = `${lowerCaseName}-Entry`;
    li.addEventListener('click', obj.fn);
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

    for (let entry of defEntries) {
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

export default sidebar();