import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';


const loginTemplate = (onSubmit) => html`
<section id="form-login">
<form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
</form>
</section>`;




export async function loginPage(ctx){

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);

        const email = form.get('email').trim();
        const password = form.get('password').trim();

        if(email == '' || password ==''){
            return alert('All field\'s are required!');
        }
        await login(email,password);
        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/');
    }

}