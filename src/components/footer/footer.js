import './footer.css';

function footer() {
    const fr = document.createDocumentFragment();

    const nav = document.createElement('nav');
    nav.classList.add('footer-links');

    const aGithub = document.createElement('a');
    const github = document.createTextNode('gitHub');
    aGithub.href = "https://github.com/rolckeirnad";
    aGithub.appendChild(github);

    const pixabay = document.createElement('a');
    pixabay.href = "https://pixabay.com/es//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=146642";
    pixabay.append('Pixabay');

    const user = document.createElement('a');
    user.href = "https://pixabay.com/es/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=146642"
    user.append('OpenClipart-Vectors');

    const link1 = document.createElement('span');
    link1.append('Image from ', user, ' at ', pixabay);

    const icons8 = document.createElement('a');
    icons8.href = "https://icons8.com/";
    icons8.append('icons 8')

    const link2 = document.createElement('span');
    link2.append('All icons by ', icons8);

    nav.append(aGithub,link1, link2);

    fr.append(nav);

    return fr;
}

export default footer();