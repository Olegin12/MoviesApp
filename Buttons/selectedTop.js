import {getMovies} from "../API/getMovies.js";
import {API_URL_AWAIT, API_URL_POPULAR, API_URL_TOP250} from "../API/API_links.js";
import {pages} from "../API/getMovies.js";

export function selectedTop () {
    let select = document.getElementById('header_select');
    select.onchange = function () {
        pages.page = 1;
        selectedTop();
    }
    let top = document.getElementById('header_select').selectedIndex + 1;
    switch (top) {
        case 1:
            getMovies(API_URL_POPULAR + pages.page)
            break

        case 2:
            getMovies(API_URL_TOP250 + pages.page)
            break

        case 3:
            getMovies(API_URL_AWAIT + pages.page)
            break;
    }
}