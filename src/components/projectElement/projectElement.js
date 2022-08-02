import events from '../../events';
import './projectElement.css';

function deleteTask(id) {
    const obj = {
        type: 'DELETE_TASK',
        key: 'tasks',
        id,
    }
    events.emit('modify state', obj);
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
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    const taskView = document.createElement('div');
    taskView.classList.add('project-element-icon-title-container')
    taskView.append(percentage, taskTitle);
    taskView.addEventListener('click', () => console.log('I should show complete task view', task.id));

    el.append(taskView, deleteButton);
    return el;
}

export default projectElement;