import './taskCreation.css';

const form = {
    priorities: ['low', 'medium', 'high'],
    project: {
        inputs: [
            {
                labelId: 'title', labelText: 'Project name: ', tag: 'input',
                attr: [
                    { name: 'type', value: 'text' },
                    { name: 'id', value: 'title' },
                    { name: 'name', value: 'title' },
                    { name: 'autocomplete', value: 'off' },
                    { name: 'required', value: '' },
                    { name: 'autofocus', value: true },
                ]
            },
        ],
    },
    task: {
        inputs: [
            {
                labelId: 'title', labelText: 'Task name: ', tag: 'input',
                attr: [
                    { name: 'type', value: 'text' },
                    { name: 'id', value: 'title' },
                    { name: 'name', value: 'title' },
                    { name: 'autocomplete', value: 'off' },
                    { name: 'required', value: '' },
                    { name: 'autofocus', value: true },
                ]
            },
            {
                labelId: 'description', labelText: 'Task description: ', tag: 'textarea',
                attr: [
                    { name: 'id', value: 'description' },
                    { name: 'name', value: 'description' },
                    { name: 'autocomplete', value: 'off' },
                ]
            },
        ],
    },
    subtask: {
        inputs: [
            {
                labelId: 'title', labelText: 'Subtask name: ', tag: 'input',
                attr: [
                    { name: 'type', value: 'text' },
                    { name: 'id', value: 'title' },
                    { name: 'name', value: 'title' },
                    { name: 'autocomplete', value: 'off' },
                    { name: 'required', value: '' },
                    { name: 'autofocus', value: true },
                ]
            },
            {
                labelId: 'notes', labelText: 'Subtask notes: ', tag: 'textarea',
                attr: [
                    { name: 'id', value: 'notes' },
                    { name: 'name', value: 'notes' },
                    { name: 'autocomplete', value: 'off' },
                ]
            },
            {
                labelId: 'priority', labelText: 'Set priority: ', tag: 'select',
                attr: [
                    { name: 'id', value: 'priority' },
                    { name: 'name', value: 'priority' },
                ]
            },
            {
                labelId: 'dueDate', labelText: 'Add due date: ', tag: 'input',
                attr: [
                    { name: 'type', value: 'text' },
                    { name: 'id', value: 'dueDate' },
                    { name: 'name', value: 'dueDate' },
                    { name: 'autocomplete', value: 'off' },
                    { name: 'required', value: '' },
                    { name: 'autofocus', value: true },
                ]
            },
        ],
    },
};

function closeForm() {
    const form = document.querySelector('#formPage');
    const parentForm = form.parentElement;
    parentForm.removeChild(form);
}

function createInputs(type) {
    const fr = document.createDocumentFragment();
    for (let input of form[type].inputs) {
        const label = document.createElement('label');
        label.setAttribute('for', input.labelId);
        label.textContent = input.labelText;
        const el = document.createElement(input.tag);
        if (input.tag == 'select') {
            for (let priority of form.priorities) {
                const option = document.createElement('option');
                option.setAttribute('value', form.priorities.indexOf(priority));
                option.textContent = priority;
                el.appendChild(option);
            }
        }
        for (let attribute of input.attr) {
            el.setAttribute(attribute.name, attribute.value);
        }
        fr.append(label, el);
    }

    return fr;
}

function readInputs() {
    const inputs = document.querySelector('#formInputs').elements;
    console.log(inputs);
    //closeForm();
}

function cacheFormElements() {
    const container = document.querySelector('#formContainer');
    const title = document.querySelector('#formTitle');
    const userInput = document.querySelector('#formInputs');
    const saveButton = document.querySelector('#saveButton');
    return {
        container,
        title,
        userInput,
        saveButton,
    }
}

function displayContainer() {
    const pageContainer = document.createElement('div');
    pageContainer.classList.add('form-background');
    pageContainer.id = "formPage";

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.id = "formContainer";

    pageContainer.appendChild(formContainer);

    const formHeader = document.createElement('div');
    formHeader.classList.add('form-header');

    const formName = document.createElement('h3');
    formName.id = "formTitle";

    const formClose = document.createElement('button');
    formClose.setAttribute('type', 'button');
    formClose.classList.add('form-close-button');
    formClose.addEventListener('click', closeForm);
    formClose.innerText = "X";

    formHeader.append(formName, formClose);

    const inputsContainer = document.createElement('form');
    inputsContainer.id = "formInputs";
    inputsContainer.classList.add('form-input-container');

    const saveButton = document.createElement('button');
    saveButton.innerText = "Save";
    saveButton.setAttribute('type', 'button');
    saveButton.classList.add('form-save-button');
    saveButton.addEventListener('click', readInputs);

    formContainer.append(formHeader, inputsContainer, saveButton);

    document.body.append(pageContainer);
}

function createPage(type = "subtask") {
    displayContainer();
    const form = cacheFormElements();

    form.title.textContent = `Create new ${type}`;
    const inputs = createInputs(type);

    form.userInput.append(inputs);
}

export default createPage;