import { html } from '../../node_modules/lit-html/lit-html.js';
import { editMovie, getMovieById } from '../api/data.js';

const editTemplate = (data,onSubmit) => html`
<section id="edit-movie">
<form @submit=${onSubmit} class="text-center border border-light p-5">
    <h1>Edit Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Movie Title" .value=${data.title} name="title">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Movie Description..." name="description" .value=${data.description}></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" .value=${data.img} name="imageUrl">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
</section>`;


export async function editPage(ctx) {
    const movie = await getMovieById(ctx.params.id);
    ctx.render(editTemplate(movie,onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        

        const form = new FormData(event.target);

        const title = form.get('title').trim();
        const description = form.get('description').trim();
        const img = form.get('imageUrl').trim();


        if(!title || !description || !img){
            return alert('All field\'s are required!');
        }
        await editMovie(ctx.params.id,{title,description,img});
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}