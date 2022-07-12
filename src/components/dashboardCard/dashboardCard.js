import { parseISOWithOptions } from 'date-fns/fp';
import './dashboardCard.css';

const priorityValues = ['Low', 'Medium', 'High'];
const priorityImages = ['./icons8-low-priority-24.png', './icons8-medium-priority-24.png', './icons8-high-priority-24.png'];

/* 
** Fields:
** name, edit button, checkbox, 
** due date, priority, parent (default: inbox)
*/

const icons = require.context(
    './',
    false,
    /\.(png|jpg|jpeg|gif)$/
);

function dashboardCard(subtask) {
    const card = document.createElement('div');
    card.classList.add('dashboard-card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('dashboard-card-header');

    const subtaskName = document.createElement('p');
    subtaskName.classList.add('dashboard-card-name');
    subtaskName.textContent = subtask.name;

    const editButton = document.createElement('button');
    editButton.classList.add('dashboard-card-header-edit');

    const buttonIcon = new Image();
    buttonIcon.classList.add('dashboard-card-icon');
    buttonIcon.src = icons('./icons8-edit-24.png');
    editButton.appendChild(buttonIcon);

    cardHeader.append(subtaskName, editButton);

    const cardBody = document.createElement('div');
    cardBody.classList.add('dashboard-card-body', 'dashboard-card-hide');

    // Group icon with span in a container
    const dueDateContainer = document.createElement('div');
    dueDateContainer.classList.add('dashboard-card-body-info');

    const dueDateIcon = new Image();
    dueDateIcon.src = icons('./icons8-day-off-24.png');
    dueDateIcon.classList.add('dashboard-card-icon');

    const dueDateValue = document.createElement('span');
    dueDateValue.classList.add('dashboard-card-dueDate');
    dueDateValue.textContent = subtask.dueDate;

    dueDateContainer.append(dueDateIcon, dueDateValue);

    const priorityContainer = document.createElement('div');
    priorityContainer.classList.add('dashboard-card-body-info');

    const priorityIcon = new Image();
    priorityIcon.src = icons(priorityImages[subtask.priority]);
    priorityIcon.classList.add('dashboard-card-icon');

    const priorityBackground = document.createElement('div');
    priorityBackground.classList.add(`dashboard-card-priority-${subtask.priority}`);

    const priority = document.createElement('span');
    priority.classList.add('dashboard-card-priority-text');
    priority.textContent = priorityValues[subtask.priority];
    priorityBackground.appendChild(priority);

    priorityContainer.append(priorityIcon, priorityBackground);

    const parentContainer = document.createElement('div');
    parentContainer.classList.add('dashboard-card-body-info');

    const parentIcon = new Image();
    parentIcon.src = icons('./icons8-box-24.png');
    parentIcon.classList.add('dashboard-card-icon');

    const parent = document.createElement('span');
    parent.classList.add('dashboard-card-parent');
    parent.textContent = subtask.parentId;

    parentContainer.append(parentIcon, parent);

    cardBody.append(dueDateContainer, priorityContainer, parentContainer);

    card.append(cardHeader, cardBody);

    return card;
}

export default dashboardCard;