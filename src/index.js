import './index.css';
import header from './components/header/header.js';
import sidebar from './components/sidebar/sidebar.js';
import footer from './components/footer/footer.js';
import dashboard from './components/dashboard/dashboard.js';
import first from './components/first/first.js';

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

    // Initial view
    _initialView();

    function _loadMainComponents() {
        _headerContent.appendChild(header);
        _sidebarContent.appendChild(sidebar);
        _footerContent.appendChild(footer);
    }

    function _initialView() {
        // If there aren't any task show first page
        if (true) {
            _todoView.replaceChildren(first);
        } else {
            // Else show dashboard and show tasks, update sidebar
            _todoView.replaceChildren(dashboard)
            _updateSideBar();
            //_updateDashboard();
        }
    }

})();
