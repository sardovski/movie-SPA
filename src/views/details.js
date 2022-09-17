import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteMovie, getMovieById, getUserLike, movieLikes, setLike } from '../api/data.js';


const detailsTemplate = (movie, logetUser, userCheck,userLike,mLike,onDelete,onLike) => html`
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movie.img}" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${logetUser ? html`${userCheck ? html`<a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>` : html`${userLike.length == 0 ? html`<a @click=${onLike} class="btn btn-primary" href="javascript:void(0)">Like</a>` : html`<span class="enrolled-span">${mLike}</span>`}`}` 
                : ''}

            </div>
        </div>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const movie = await getMovieById(ctx.params.id);
    const logetUser = sessionStorage.getItem('userId');
    const userCheck = logetUser == movie._ownerId;
    const userLike = await getUserLike(ctx.params.id,logetUser);
    const mLike = await movieLikes(ctx.params.id);

    ctx.render(detailsTemplate(movie, logetUser, userCheck,userLike,mLike,onDelete,onLike));


    async function onDelete() {
        const des = confirm('Are you sure?');
        if(des){
            await deleteMovie(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await setLike(ctx.params.id);
        ctx.page.redirect('/details/'+ctx.params.id);
    }
}