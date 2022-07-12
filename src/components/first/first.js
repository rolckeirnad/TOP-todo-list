import './first.css';
import createPage from '../taskCreation/taskCreation';

function first() {
    const firstTimeContainer = document.createElement('div');
    firstTimeContainer.classList.add('first-time-container');

    const message = document.createElement('p');
    message.classList.add('first-message');
    message.textContent = "It seems that you don't have any task yet";

    const firstContainer = document.createElement('div');
    firstContainer.classList.add('first-create-container');

    const firstButton = document.createElement('button');
    firstButton.classList.add('first-add-button');
    firstButton.setAttribute('type', 'button');
    firstButton.innerText = "+";
    firstButton.addEventListener('click', () => createPage('subtasks'));

    const firstTask = document.createElement('p');
    firstTask.classList.add('first-block');
    firstTask.textContent = "Click on the next button to create a task and add it directly to Inbox or go to projects section and create your first project to start adding it tasks.";

    firstContainer.append(firstTask, firstButton);

    /** Talk about Options */
    const defaultEntries = document.createElement('div');
    defaultEntries.classList.add('first-default-entries');
    const dashboard = document.createElement('p');
    dashboard.textContent = "Dashboard: Here you can view a resume of all pending tasks ordered by due date";
    const inbox = document.createElement('p');
    inbox.textContent = "Inbox: All your quick tasks and tasks without assigned project will be here";
    const today = document.createElement('p');
    today.innerText = "Today: All your today's tasks will be listed here";
    const tomorrow = document.createElement('p');
    tomorrow.innerText = "Tomorrow: All your tomorrow's tasks will be listed here";
    const upcoming = document.createElement('p');
    upcoming.innerText = "Upcoming: All your tasks for next 14 days will be listed here";
    const anytime = document.createElement('p');
    anytime.innerText = "Anytime: All your created tasks will show here";

    defaultEntries.append(dashboard, inbox, today, tomorrow, upcoming, anytime);

    /** Say where you can create your first task */
    const userEntries = document.createElement('div');
    userEntries.classList.add('first-user-entries');
    const userEntriesDescription = document.createElement('p');
    userEntriesDescription.innerText = "You can create projects and add your tasks to them";
    const createUserEntry = document.createElement('p');
    createUserEntry.innerText = "To add a new project click on the  red '+' button";

    userEntries.append(userEntriesDescription, createUserEntry);

    firstTimeContainer.append(message, firstContainer, defaultEntries, userEntries);

    return firstTimeContainer;
}

export default first();