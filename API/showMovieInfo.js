import {API_URL_STAFF} from "./API_links.js";
import {getStuff} from "./getStuff.js";
import {getYearsInfo} from "./getYears.js";
import {closeModal} from "../Buttons/closeModal.js";

export function showMovieInfo(movieData) {
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("modal");
    movieInfo.id = "modal";
    movieInfo.innerHTML = `
        <div class="modal_movie_title">${movieData.nameRu}</div>        
        <div class="modal_movie_category">${movieData.genres.map(
        (genre) => ` ${genre.genre}`
    )}</div>
        <img 
            src="${movieData.posterUrlPreview}"
            class="modal_movie_cover"
            alt="${movieData.nameRu}"
            >
        <div class="modal_movie_info">${movieData.description}</div>
        <button class="modal_button_close">×</button>
    `;
    document.body.appendChild(movieInfo);
    getYearsInfo(movieData);
    getStuff(API_URL_STAFF + movieData.kinopoiskId);
    window.onclick = function (e) {
        if (e.target === movieInfo) {
            movieInfo.remove();
        }
    }
    closeModal();
}