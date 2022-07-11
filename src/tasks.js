/// We use to create and assign id to our objects
const idStore = (() => {
    let id = {
        project: 0,
        task: 0,
        subtask: 0,
    }

    const getId = (key) => id[key]++;

    return {
        getId,
    };
})();

const Project = () => {
    const obj = {
        id: idStore.getId('project'),
        name: null,
        tasks: [],
    }

    return obj;
};


const Subtask = () => {
    const obj = {
        id: idStore.getId('subtask'),
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
