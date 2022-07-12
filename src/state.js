import events from "./events";

function newState() {
    let data = {
        projects: [ // Here we'll store user projects
            { name: 'Family', tasks: [] },
        ],
        tasks: [  // Here we'll store tasks of projects
        ],
        subtasks: [ // Here we'll store subtasks of projects
        ],
    };

    const saveObject = (task, type) => {
        data = {
            ...data,
            [type]: [...data[type], task],
        }
        const FIRE_EVENT = `${type} updated`;
        saveToStorage(); // Save to storage
        events.emit(FIRE_EVENT, data[type]);
    }

    const setData = (obj) => {
        data = Object.assign({}, obj)
    };

    const getData = (type) => data[type];

    const saveToStorage = () => {
        const newData = JSON.stringify(data);
        localStorage.setItem('todos', newData);
    };

    const loadFromStorage = () => {
        if (localStorage.getItem('todos')) {
            // Load storage and get properties
            const loadedData = JSON.parse(localStorage.getItem('todos'));
            // Save to state
            setData(loadedData);
            console.log("New state loaded: ", data);
            events.emit('subtasks loaded', data.subtasks);
            events.emit('tasks loaded', data.tasks);
            events.emit('projects loaded', data.projects);
        }
    };

    return {
        saveObject,
        loadFromStorage,
        saveToStorage,
        getData,
    }
}

const state = newState();

export default state;
