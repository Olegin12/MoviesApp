import {API_URL_SEARCH} from "./API_links.js";
import {getMovies, pages} from "./getMovies.js";

export function searchFilms() {
    const form = document.querySelector("form");
    const search = document.querySelector(".header_search");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
        if (search.value) {
            getMovies(apiSearchUrl);
            search.value = "";
            pages.page = 1;
        }
    })
}