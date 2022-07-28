import './displayList.css';
import events from '../../events';
import state from '../../state';
import { dateFormat, shortDate } from '../../configuration';
import { isWithinInterval, parse } from 'date-fns';
import listElement from '../listElement/listElement';

const _todosView = document.querySelector('#todos-view');

function header(title) {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('display-list-header-container');

    const headerText = document.createElement('h1');
    headerText.classList.add('display-list-header');
    headerText.textContent = title;

    headerContainer.append(headerText);
    return headerContainer;
}

function list() {
    const listContainer = document.createElement('div');
    listContainer.id = 'display-list-tasks-container';
    //listContainer.classList.add('display-list-tasks-container');

    return listContainer;
}

function setInterval(start, end) {
    return function (arr) {
        const newArr = arr.filter(subtask => {
            const parsedDate = parse(subtask.dueDate, dateFormat, new Date());
            return isWithinInterval(parsedDate, {
                start,
                end,
            });
        });
        // Populate list
        const container = document.querySelector('#display-list-tasks-container');
        container.replaceChildren();
        const cardOptions = {
            displayParent: true,
            displayDate: true,
            displayNotes: true,
            displayChecklist: true,
            dateFormat: shortDate,
        }
        for (const subtask of newArr) {
            // We need to add parent name
            const el = listElement(subtask, cardOptions);
            container.appendChild(el);
        }
    }
}

function getList(entry) {
    events.removeTempEvents();
    const setHeader = header(entry.name);
    const setList = list();

    _todosView.replaceChildren(setHeader);
    _todosView.appendChild(setList);

    loadSubtasks = setInterval(entry.startDate, entry.endDate);

    const data = state.getData('subtasks');
    loadSubtasks(data)
    events.on('subtasks updated', loadSubtasks, true);
}

let loadSubtasks;

export default getList;