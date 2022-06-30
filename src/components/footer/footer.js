import './footer.css';

function footer() {
    const fr = document.createDocumentFragment();

    const nav = document.createElement('nav');
    nav.classList.add('footer-links');

    const aGithub = document.createElement('a');
    const github = document.createTextNode('gitHub');
    aGithub.href = "https://github.com/rolckeirnad";
    aGithub.appendChild(github);

    nav.appendChild(aGithub);

    fr.appendChild(nav);

    return fr;
}

export default footer();