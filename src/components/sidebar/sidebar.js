import './sidebar.css';
const defEntries = ['Dashboard', 'Inbox', 'Today', 'Upcoming', 'Anytime'];
const usrEntries = ['Default'];

function createLi(name) {
    const li = document.createElement('li');
    li.classList.add(name.toLowerCase());
    li.textContent = name;

    return li;
}

function sidebar() {
    const fr = document.createDocumentFragment();

    const defaultEntries = document.createElement('ul');
    defaultEntries.classList.add('default-entries');

    for (let entry of defEntries) {
        const newLi = createLi(entry);
        defaultEntries.appendChild(newLi);
    }

    fr.appendChild(defaultEntries);

    const hr = document.createElement('hr');
    fr.appendChild(hr);

    const userEntries = document.createElement('ul');
    userEntries.classList.add('user-entries');

    for (let entry of usrEntries) {
        const newLi = createLi(entry);
        userEntries.appendChild(newLi);
    }

    fr.appendChild(userEntries);

    return fr;
}

export default sidebar();