import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const registerTemplate =(onSubmit)=>html`
<section id="form-sign-up">
<form @submit=${onSubmit} class="text-center border border-light p-5">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <div class="form-group">
        <label for="repeatPassword">Repeat Password</label>
        <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>
</section>`;

export async function registerPage(ctx){

    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);

        const email = form.get('email').trim();
        const password = form.get('password').trim();
        const repeatPass = form.get('repeatPassword').trim();


        if(email == '' || password ==''){
            return alert('All field\'s are required!');
        }
        
        if(repeatPass !== password){
            return alert('Passwords not match!');
        }

        await register(email,password);
        event.target.reset();
        ctx.setUserNav();

        ctx.page.redirect('/');
    }

}