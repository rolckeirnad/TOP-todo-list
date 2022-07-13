import './listView.css';
import state from '../../state';
import listElement from '../listElement/listElement';
import createPage from '../taskCreation/taskCreation';

// Maybe it's convenient to group with days
// Fri May 8
// Sat May 9 ... etc

const _todosView = document.querySelector('#todos-view');

function list(type, fn) {
    const el = document.createElement('div');
    el.setAttribute('id', 'listView');

    // Back logo, header text, options
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('list-header-container');

    const headerText = document.createElement('h1');
    headerText.classList.add('list-header');
    headerText.textContent = type;              //Selected option

    const addButton = document.createElement('button');
    addButton.classList.add('list-header-add-button');
    addButton.setAttribute('type', 'button');
    addButton.innerText = "Add new subtask +";
    addButton.addEventListener('click', () => createPage('subtasks'));

    headerContainer.append(headerText, addButton);

    const tasksContainer = document.createElement('div');
    tasksContainer.id = 'list-subtasks';
    tasksContainer.classList.add('list-tasks-container');

    // Load data, filter and store it in array
    const data = state.getData('subtasks');
    const filteredData = data.filter(fn);
    // Load filtered tasks and load inside this container
    for (let subtask of filteredData) {
        // We need to create another component for listElements.
        const el = listElement(subtask);
        tasksContainer.appendChild(el);
    }

    el.append(headerContainer, tasksContainer);
    return el;
}

function loadSubtasks() {

}

function loadList(type, fn) {
    const newList = list(type, fn);
    _todosView.replaceChildren(newList);
}

export default loadList;