import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllMovies() {
    return await api.get(host + '/data/movies');
}

export async function getMovieById(id) {
    return await api.get(host + `/data/movies/${id}`);

}

export async function getUserLike(movieId,userId) {
    return await api.get(host + `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
    
}

export async function movieLikes(movieId) {
    return await api.get(host + `/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
    
}
export async function deleteMovie(id) {
    return await api.del(host + `/data/movies/${id}`);

} 

export async function setLike(mId) {
    return await api.post(host + '/data/likes',{movieId: mId});
    
}
export async function editMovie(id, body) {
    return await api.put(host + `/data/movies/${id}`, body);

}
export async function createMovie(body) {
    return await api.post(host + '/data/movies', body);
    
}
/*





export async function myCars(userId) {
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
} */