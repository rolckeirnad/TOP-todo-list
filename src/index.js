import './index.css';
import header from './components/header/header.js';
import sidebar from './components/sidebar/sidebar.js';

const headerContent = document.querySelector('.header-content');
headerContent.appendChild(header);
const sidebarContent = document.querySelector('.sidebar');
sidebarContent.appendChild(sidebar);
const test = document.querySelector('.header-content');
test.appendChild(header);
