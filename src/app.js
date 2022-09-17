import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import{logout} from '../src/api/data.js';
import { detailsPage } from './views/details.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { editPage } from './views/editMovie.js';
import { createPage } from './views/create.js';



const main = document.querySelector('main');
const navigation = document.querySelector('nav');
document.querySelector('#logoutBtn').addEventListener('click',logoutUser);

setUserNav();
page('/',midWare,homePage);
page('/details/:id',midWare,detailsPage);
page('/register',midWare,registerPage);
page('/login',midWare,loginPage);
page('/edit/:id',midWare,editPage);
page('/add-movie',midWare,createPage);

page.start();



function midWare(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = () => setUserNav();

    next();
}


function setUserNav() {
    const userEmail = sessionStorage.getItem('email');

    if (userEmail) {
        navigation.querySelector('#welcome-user').textContent = `Welcome, ${userEmail}`;
        [...navigation.querySelectorAll('.user-nav')].forEach(x => x.style.display = '');
        [...navigation.querySelectorAll('.guest-nav')].forEach(x => x.style.display = 'none');

    } else {
        [...navigation.querySelectorAll('.user-nav')].forEach(x => x.style.display = 'none');
        [...navigation.querySelectorAll('.guest-nav')].forEach(x => x.style.display = '');

    }
}


async function logoutUser() {
    await logout();
    setUserNav();
    page.redirect('/');
}