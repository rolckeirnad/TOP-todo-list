/// We use to create and assign id to our objects
const idStore = (() => {
    let id = {
        project: 0,
        task: 0,
        subtask: 0,
    }

    const getId = (key) => id[key]++;
    const getNextId = () => id;

    return {
        getId,
        getNextId,
    };
})();

const Subtask = () => {
    const obj = {
        id: idStore.getId('subtask'),
        name: null,
        notes: null,
        priority: 0,
        dueDate: null,
        checklist: [],
        header: [],
        completed: false,
        last: () => console.log("I am a function"),
    }
    return obj;
};
