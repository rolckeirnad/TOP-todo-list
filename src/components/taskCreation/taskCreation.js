import './taskCreation.css';
import datepicker from 'js-datepicker';
import format from 'date-fns/format';
import { getNewObject } from '../../tasks';
import state from '../../state';

// This object defines the form inputs for each type of new object (project, task, subtask)
// as well the required inputs and options for select tags
const form = {
    projects: {
        requiredInputs: ['name'],
        inputs: [
            {
                labelId: 'name', labelText: 'Project name: ', tag: 'input',
                attr: [
                    { name: 'type', value: 'text' },
                    { name: 'id', value: 'name' },
                    { name: 'name', value: 'name' },
                    { name: 'autocomplete', value: 'off' },
                    { name: 'required', value: '' },
                    { name: 'autofocus', value: true },
                ]
            },
        ],
    },
    tasks: {
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
    subtasks: {
        requiredInputs: ['name', 'priority', 'dueDate'],
        inputs: [
            {
                labelId: 'name', labelText: 'Subtask name: ', tag: 'input',
                attr: [
                    { name: 'type', value: 'text' },
                    { name: 'id', value: 'name' },
                    { name: 'name', value: 'name' },
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
                options: ['low', 'medium', 'high'],
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
            for (let option of input.options) {
                const optionEl = document.createElement('option');
                optionEl.setAttribute('value', input.options.indexOf(option));
                optionEl.textContent = option;
                el.appendChild(optionEl);
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
    const form = document.querySelector('#formInputs');
    const type = form.dataset.type;
    const formInputs = form.elements;
    let inputValues = Object.fromEntries(new FormData(form));

    // Will check for valid inputs, if are invalid will add an error class
    const invalidInputs = validateInputs(inputValues, type);
    if (invalidInputs.length == 0) {
        // Create and store to state, this will trigger a rerender.
        const newInput = getNewObject(inputValues, type); //
        state.saveObject(newInput, type); // 
        closeForm();
    } else {
        // format invalid fields
        addClass(formInputs, invalidInputs, 'invalid');
    }
}

function validateInputs(inputs, type) {
    let invalidFields = [];
    for (let field of form[type].requiredInputs) {
        if (!inputs[field]) {
            invalidFields.push(field);
        }
    }
    return invalidFields;
}

function addClass(nodeList, idArr, classValue) {
    [...nodeList].forEach(el => {
        if (idArr.indexOf(el.id) > -1) el.classList.add(classValue);
        else el.classList.remove(classValue);
    })
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

function createPage(type = "subtasks") {
    displayContainer();
    const form = cacheFormElements();

    form.title.textContent = `Create new ${type}`;
    form.userInput.setAttribute('data-type', type);
    const inputs = createInputs(type);

    form.userInput.append(inputs);
    const calendar = document.querySelector('#dueDate');
    if (calendar) {
        const dueDateCalendar = datepicker(calendar, {
            formatter: (input, date, instance) => {
                const value = format(date, "MMMM d'th,' yyyy");
                input.value = value;
            }
        });
    }
}

export default createPage;