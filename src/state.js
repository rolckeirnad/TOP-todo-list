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
    }

    return {
        saveObject,
    }
}

const state = newState();

export default state;
