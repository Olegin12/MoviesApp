import {API_URL_INFO} from "./API_links.js";
import {getMovieInformation} from "./getMovieInfo.js";
import {getClassByRating} from "./getRating.js";

export function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML ="";

    data.films.forEach(movie => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.addEventListener('click', function () {
            getMovieInformation(API_URL_INFO + movie.filmId)
        })
        movieEl.innerHTML = `
           <div class="movie_cover-inner">
                    <img
                            src="${movie.posterUrlPreview}"
                            class="movie_cover"
                            alt="${movie.nameRu}">
                    <div class="movie_cover-dark"></div>
                </div>
                <div class="movie_info">
                    <div class="movie_title">${movie.nameRu}</div>
                    <div class="movie_category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
        )}</div>
                    <div class="movie_average movie_average-${getClassByRating(movie.rating)}">${movie.rating}</div>
                </div>
                <button class="more_information">Подробнее</button>
                        `;
        moviesEl.append(movieEl);
    });
}