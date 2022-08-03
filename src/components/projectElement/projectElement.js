import events from '../../events';
import './projectElement.css';
import loadTaskView from '../taskView/taskView';

function deleteTask(task) {
    // Delete subtasks
    deleteAllChildrenSubtasks(task.subtasks);
    // Delete task
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

function projectElement(task) {
    const el = document.createElement('div');
    el.classList.add('project-element');
    el.dataset.id = task.id;
    // Percentage, Task title, options
    const percentage = document.createElement('div');
    percentage.classList.add('project-element-percentage');

    const taskTitle = document.createElement('span');
    taskTitle.textContent = task.name;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('project-element-options-button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', () => deleteTask(task));

    const taskView = document.createElement('div');
    taskView.classList.add('project-element-icon-title-container')
    taskView.append(percentage, taskTitle);
    taskView.addEventListener('click', () => loadTaskView(task));

    el.append(taskView, deleteButton);
    return el;
}

export default projectElement;