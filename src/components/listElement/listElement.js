import './listElement.css';

const priorityValueList = ['Low', 'Medium', 'High'];
const priorityIconList = [
    './icons8-low-priority-24.png',
    './icons8-medium-priority-24.png',
    './icons8-high-priority-24.png'
];

const icons = require.context(
    './',
    false,
    /\.(png|jpg|jpeg|gif)$/
);

function listElement(subtask) {
    const el = document.createElement('div');
    el.classList.add('list-element');

    const header = document.createElement('div');
    header.classList.add('list-element-header');

    const nameContainer = document.createElement('p');
    nameContainer.classList.add('list-element-title');

    const priorityIcon = new Image();
    priorityIcon.src = icons(priorityIconList[subtask.priority]);
    priorityIcon.classList.add('list-element-priority-icon', 'list-element-icon');

    const titleTextNode = document.createTextNode(subtask.name)

    nameContainer.append(priorityIcon, titleTextNode);

    const parentInfoContainer = document.createElement('p');
    parentInfoContainer.classList.add('list-element-parent-container');

    const parentContainerPlaceholder = document.createTextNode('in ');
    const parentName = document.createElement('span');
    parentName.classList.add('list-element-parent-name');
    parentName.textContent = subtask.parentId;

    parentInfoContainer.append(parentContainerPlaceholder, parentName);
    header.append(nameContainer, parentInfoContainer);

    const body = document.createElement('div');
    body.classList.add('list-element-body');

    if (subtask.notes) {
        const notesContainer = document.createElement('div');
        notesContainer.classList.add('list-element-data');

        const notesIcon = new Image();
        notesIcon.src = icons('./icons8-note-24.png');
        notesIcon.classList.add('list-element-notes-icon', 'list-element-icon');

        const notesText = document.createElement('p');
        notesText.classList.add('list-element-notes-text');
        notesText.textContent = subtask.notes;

        notesContainer.append(notesIcon, notesText);
        body.appendChild(notesContainer);
    }
    // If subtask has a checklist
    if (subtask.checklist) {
        const checklistContainer = document.createElement('div');
        checklistContainer.classList.add('list-element-data');

        const checklistIcon = new Image();
        checklistIcon.src = icons('./icons8-to-do-24.png');
        checklistIcon.classList.add('list-element-checklist-icon', 'list-element-icon');

        const checklistText = document.createElement('p');
        checklistText.classList.add('list-element-checklist');
        checklistText.textContent = 'Checklist: ';
        checklistContainer.append(checklistIcon, checklistText);

        const checklistElements = document.createElement('div');
        checklistElements.classList.add('list-element-checklist-container');

        for (let check of subtask.checklist) {
            const label = document.createElement('label');
            label.setAttribute('for', `${check.name}-${check.id}`);
            label.textContent = check.name;

            const el = document.createElement('input');
            el.id = `${check.name}-${check.id}`;
            el.setAttribute('type', 'checkbox');
            el.classList.add('list-element-checklist-element');
            label.prepend(el);
            checklistElements.appendChild(label);
        }

        body.appendChild(checklistContainer);
    }


    const footer = document.createElement('div');
    footer.classList.add('list-element-footer');

    const toggleButton = document.createElement('button');
    toggleButton.id = 'a-unique-id';
    toggleButton.setAttribute('type', 'button');
    toggleButton.classList.add('list-element-button');
    toggleButton.innerText = "Mark as completed";
    // Attach a method to alternate complete state for this element.

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('list-element-button');
    deleteButton.innerText = "Delete Subtask";

    footer.append(toggleButton, deleteButton);

    el.append(header, body, footer);

    return el;
}

export default listElement;