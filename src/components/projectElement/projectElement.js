import './projectElement.css';

function projectElement(task) {
    const el = document.createElement('div');
    el.classList.add('project-element');
    el.dataset.id = task.id;
    // Percentage, Task title, options
    const percentage = document.createElement('div');
    percentage.classList.add('project-element-percentage');

    const taskTitle = document.createElement('span');
    taskTitle.textContent = task.name;

    const optionButton = document.createElement('button');
    optionButton.classList.add('project-element-options-button');
    optionButton.setAttribute('type', 'button');
    optionButton.innerText = "Delete";
    optionButton.addEventListener('click', () => console.log("I should delete this"));

    const taskView = document.createElement('div');
    taskView.classList.add('project-element-icon-title-container')
    taskView.append(percentage, taskTitle);
    taskView.addEventListener('click', () => console.log('I should show complete task view'),);

    el.append(taskView, optionButton);
    return el;
}

export default projectElement;