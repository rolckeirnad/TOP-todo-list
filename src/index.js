import './index.css';
import header from './components/header/header.js';
import sidebar from './components/sidebar/sidebar.js';
import footer from './components/footer/footer.js';
import dashboard from './components/dashboard/dashboard.js';

(function () {
    // Load components
const headerContent = document.querySelector('.header-content');
headerContent.appendChild(header);
const sidebarContent = document.querySelector('.sidebar');
sidebarContent.appendChild(sidebar);
const footerContent = document.querySelector('.footer-content');
footerContent.appendChild(footer);
    const todoView = document.querySelector('#todos-view');
    todoView.appendChild(dashboard);
})();
