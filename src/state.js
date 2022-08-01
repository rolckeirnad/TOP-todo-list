import events from "./events";

function newState() {
    let data = {
        projects: [ // Here we'll store user projects
        ],
        tasks: [  // Here we'll store tasks of projects
            {
                id: 0,
                parentId: null,
                name: "Inbox",
                subtasksNum: null,
                completedSubtasks: null,
                progress: 0,
            }
        ],
        subtasks: [ // Here we'll store subtasks of projects
        ],
    };

    const getData = (type) => [...data[type]];
    const setData = (newData, type) => data[type] = newData;
    const getState = () => { return { ...data } };
    const setState = (state) => data = state;

    return {
        getData,
        setData,
        getState,
        setState,
    }
}

const state = newState();

const initialData = {
    projects: [ // Here we'll store user projects
    ],
    tasks: [  // Here we'll store tasks of projects
        {
            id: 0,
            name: "Inbox",
            parentId: null,
            subtasksNum: null,
            completedSubtasks: null,
            progress: 0,
        }
    ],
    subtasks: [ // Here we'll store subtasks of projects
    ],
};

// Helper state functions
const addNewObject = (obj, type) => {
    let data = state.getState();
    data = {
        ...data,
        [type]: [...data[type], obj],
    }
    return data;
};

const saveNewState = (data, key) => {
    state.setData(data, key);
    const newState = state.getState();
    saveToStorage(newState);
    events.emit(`${key} updated`, data);
};

const getIndex = (arr, id) => {
    return arr.findIndex(subtask => subtask.id == id);
};

const saveToStorage = (data) => {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem('todos', stringifiedData);
};

const loadFromStorage = () => {
    if (localStorage.getItem('todos')) {
        const parsedData = JSON.parse(localStorage.getItem('todos'));
        return parsedData;
    }
    else {
        return initialData;
    }
};

const stateDispatcher = (action) => {
    switch (action.type) {
        case 'LOAD_STATE': {
            const loadedData = loadFromStorage();
            state.setState(loadedData);
            events.emit('initial view', loadedData.subtasks);
            events.emit('subtasks loaded', loadedData.subtasks);
            events.emit('tasks loaded', loadedData.tasks);
            events.emit('projects loaded', loadedData.projects);
            break;
        }
        case 'SAVE_NEW_OBJECT': {
            const newData = addNewObject(action.obj, action.key);
            state.setState(newData);
            const FIRE_EVENT = `${action.key} updated`;
            events.emit(FIRE_EVENT, newData[action.key]);
            saveToStorage(newData);
            break;
        }
        case 'TOGGLE_STATE': {
            // Get data array, get index in array of desired object 
            const data = state.getData(action.key);
            const index = getIndex(data, action.id);
            // Modify object
            const isCompleted = data[index].completed;
            data[index] = Object.assign({}, data[index], { completed: !isCompleted });
            // Save new state
            saveNewState(data, action.key);
            break;
        }
        case 'DELETE_TASK': {
            // Get data array, get index in array of desired object
            const data = state.getData(action.key);
            const index = getIndex(data, action.id);
            // Modify object
            data.splice(index, 1);
            // Save new state
            saveNewState(data, action.key);
            break;
        }
        default:
            console.error('Not implemented ...');
    }
};

events.on('modify state', stateDispatcher);

export default state;
