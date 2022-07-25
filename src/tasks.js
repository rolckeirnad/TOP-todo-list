/// We use to create and assign id to our objects
const getUniqueId = function () {
    return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36);
}

const Project = () => {
    const obj = {
        id: getUniqueId(),
        name: null,
        tasks: [],
    }

    return obj;
};

const Task = (title, description = null) => {
    const obj = {
        id: getUniqueId(),
        title,
        description,
        subtasksNum: null,
        completedSubtasks: null,
        progress: 0,
        headers: [],
        subtasks: [],
    }
    return obj;
};

const Subtask = () => {
    const obj = {
        id: getUniqueId(),
        parentId: 0, // Default id 0 will be 'Inbox'
        name: null,
        notes: null,
        priority: 0,
        dueDate: null,
        // checklist: [], this checklist is optional
        header: [],
        completed: false,
        last: () => console.log("I am a function"),
    }
    return obj;
};

export const getNewObject = (inputs, type) => {
    switch (type) {
        case 'projects':
            return Object.assign({}, Project(), inputs);
        /* case 'tasks':
            return Task(inputs); */
        case 'subtasks':
            return Object.assign({}, Subtask(), inputs);
        default:
            console.error('Not implemented...')
            break;
    }
};
