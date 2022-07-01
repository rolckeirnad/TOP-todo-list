import './dashboard.css';

const columns = ['Today', 'Tomorrow', 'Week', 'Month'];

function dashboard() {
    const el = document.createElement('div');
    el.classList.add('dashboard-container');

    for (let each of columns) {
        const lowerCase = each.toLowerCase();
        const column = document.createElement('div');
        column.classList.add('dashboard-column');
        column.setAttribute('id', `dashboard-${lowerCase}`);

        const headerContainer = document.createElement('div');
        headerContainer.classList.add(`dashboard-header-${lowerCase}`);

        const header = document.createElement('h1');
        header.classList.add("dashboard-header", `${lowerCase}`);
        header.textContent = each;
        headerContainer.appendChild(header);
        column.appendChild(headerContainer);

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('dashboard-task-container');
        column.appendChild(taskContainer);

        el.appendChild(column);
    }

    return el;
}

export default dashboard();