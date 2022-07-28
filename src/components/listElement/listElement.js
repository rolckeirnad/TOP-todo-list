import './listElement.css';
import events from '../../events';
import { format, parse } from 'date-fns';
import { dateFormat } from '../../configuration';

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

function toggleState(id) {
    // Toggle state
    // A dispatcher send type, and data
    // Example: type: 'TOGGLE_STATE', action: { id }
    const obj = {
        type: 'TOGGLE_STATE',
        key: 'subtasks',
        id,
    };
    events.emit('modify state', obj);
}

function deleteSubtask(id) {
    // Delete Subtask
    const obj = {
        type: 'DELETE_TASK',
        key: 'subtasks',
        id,
    };
    events.emit('modify state', obj);
}

function listElement(subtask, options) {
    const el = document.createElement('div');
    el.classList.add('list-element');

    const header = document.createElement('div');
    header.classList.add('list-element-header');

    const nameContainer = document.createElement('p');
    nameContainer.classList.add('list-element-title');

    const priorityIcon = new Image();
    priorityIcon.src = icons(priorityIconList[subtask.priority]);
    priorityIcon.classList.add('list-element-priority-icon', 'list-element-icon');

    const titleText = document.createElement('span');
    titleText.classList.add('list-element-title-text');
    titleText.textContent = subtask.name;

    nameContainer.append(priorityIcon, titleText);

    if (options.displayDate) {
        const dateContainer = document.createElement('div');
        dateContainer.classList.add('list-element-date-container');
        const dateSpan = document.createElement('span');
        dateSpan.classList.add('list-element-date-span');
        const parsedDate = parse(subtask.dueDate, dateFormat, new Date());
        const formattedDate = format(parsedDate, options.dateFormat);
        dateSpan.textContent = formattedDate;
        dateContainer.appendChild(dateSpan);
        nameContainer.appendChild(dateContainer);
    }

    header.append(nameContainer);

    if (options.displayParent) {
        const parentInfoContainer = document.createElement('p');
        parentInfoContainer.classList.add('list-element-parent-container');

        const parentContainerPlaceholder = document.createTextNode('in ');
        const parentName = document.createElement('span');
        parentName.classList.add('list-element-parent-name');
        parentName.textContent = subtask.parentName;

        parentInfoContainer.append(parentContainerPlaceholder, parentName);
        header.appendChild(parentInfoContainer);
    }

    const body = document.createElement('div');
    body.classList.add('list-element-body');

    if (options.displayNotes && subtask.notes) {
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
    if (options.displayChecklist && subtask.checklist) {
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
    //toggleButton.id = subtask.id;
    toggleButton.setAttribute('type', 'button');
    toggleButton.classList.add('list-element-button');
    toggleButton.addEventListener('click', (e) => toggleState(subtask.id), false);
    const toggleIcon = new Image();
    const toggleString = subtask.completed ? 'Unmark as completed' : 'Mark as complete';
    const toggleText = document.createTextNode(toggleString);
    // Attach a method to alternate complete state for this element.
    if (subtask.completed) {
        toggleIcon.src = icons('./icons8-checked-radio-button-24.png');
        toggleButton.classList.add('list-element-button-completed');
    } else {
        toggleIcon.src = icons('./icons8-unchecked-radio-button-24.png');
        toggleButton.classList.add('list-element-button-uncompleted');
    }
    toggleButton.append(toggleIcon, toggleText);

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('list-element-button', 'delete');
    const deleteIcon = new Image();
    deleteIcon.src = icons('./icons8-trash-24.png');
    deleteButton.append(deleteIcon, 'Delete');
    deleteButton.addEventListener('click', (e) => deleteSubtask(subtask.id), false);

    footer.append(toggleButton, deleteButton);

    el.append(header, body, footer);

    return el;
}

export default listElement;

// This element on clicking edit button we can edit the subtask
// On Mark/Unmark as complete should update the value and save to storage
// On delete should delete the specified card

// Maybe I need to implement a reducer to prevent editing the state.js

// state.js will only keep state of app (data structure, create read update and delete functionalities)
// --> Maybe I can add reducer inside state to control actions from files
// events.js will only add events functionality
// reducer.js will only act as a bridge for functionalities from 
// state(create, read, update, delete), storage(save, load, delete) and dispatching emit events