import './header.css';
import Logo from './notebook-146642.svg'

function header() {
    const el = document.createDocumentFragment();

    const logo = new Image();
    logo.src = Logo;
    logo.classList.add('header-logo');
    el.appendChild(logo);

    const appName = document.createElement('h2');
    appName.classList.add('header-title');
    appName.textContent = "My Personal Todo List App";

    el.appendChild(appName);
    return el;
}

export default header();