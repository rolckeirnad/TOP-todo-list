import './sidebar.css';

// Test data - This will replaced with state and some file configuration
const defEntries = [
    { name: 'Dashboard', icon: './icons8-dashboard-layout-100.png', counter: false, fn: () => console.log("Dashboard") },
    { name: 'Inbox', icon: './icons8-inbox-100.png', counter: true, fn: () => console.log("Inbox") },
    { name: 'Today', icon: './icons8-today-100.png', counter: true, fn: () => console.log("Today") },
    { name: 'Upcoming', icon: './icons8-date-to-100.png', counter: true, fn: () => console.log("Upcoming") },
    { name: 'Anytime', icon: './icons8-calendar-100.png', counter: true, fn: () => console.log("Anytime") },
];

const testProjects = [
    { name: 'Project 1', tasks: [] },
    { name: 'Project 2', tasks: [] },
    { name: 'Project 3', tasks: [] }
];
// End of Test data

const icons = require.context(
    './',
    false,
    /\.(png|jpg|jpeg|gif)$/
);

function createLi(obj, icon = false) {
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
        // We create li elements
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

    projectHeader.append(projectHeaderTitle, projectHeaderButton);

    fr.appendChild(projectHeader);

    const userEntries = document.createElement('ul');
    userEntries.classList.add('user-entries');
    userEntries.id = 'userEntries';

    for (let entry of testProjects) {
        const setIcon = Object.assign(entry, { icon: './icons8-box-100.png' });
        const newLi = createLi(setIcon);
        userEntries.appendChild(newLi);
    }

    fr.appendChild(userEntries);

    return fr;
}

export default sidebar();