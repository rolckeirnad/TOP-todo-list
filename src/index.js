import './index.css';
import header from './components/header/header.js';
import sidebar from './components/sidebar/sidebar.js';
import footer from './components/footer/footer.js';
import events from './events';

(function () {
    // Cached DOM
    const _headerContent = document.querySelector('.header-content');
    const _sidebarContent = document.querySelector('.sidebar');
    const _footerContent = document.querySelector('.footer-content');
    const _todoView = document.querySelector('#todos-view');

    _loadMainComponents(); // Maybe I can add these components directly into my html template

    // Cached sidebar containers
    const _defaultEntries = document.querySelector('#defaultEntries');
    const _userEntries = document.querySelector('#userEntries');

    // Load data from localStorage
    _loadData(); // This triggers and dispatch all events

    // Initial view
    _initialView();

    function _loadMainComponents() {
        _headerContent.appendChild(header);
        _sidebarContent.appendChild(sidebar);
        _footerContent.appendChild(footer);
    }

    function _loadData() {
        const obj = {
            type: 'LOAD_STATE',
        };
        events.emit('modify state', obj);
    }

    function _initialView() {
        const dashboard = document.querySelector('#dashboard-Entry');
        dashboard.click();
    }

})();
