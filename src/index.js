import './index.css';
import header from './components/header/header.js';

const test = document.querySelector('.header-content');
test.appendChild(header);

body.textContent = "Hello webpack!"