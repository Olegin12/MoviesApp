export {next, prev};
import {pages} from "../API/getMovies.js";
import {selectedTop} from "./selectedTop.js";

const next = document.getElementById('next');
const prev = document.getElementById('prev');

next.onclick = function () {
    pages.page ++;
    if (pages.page >= pages.page_count) {
        pages.page = pages.page_count;
    }

    selectedTop();

    window.scrollTo(0, 0);
}

prev.onclick = function () {
    pages.page --;

    if (pages.page < pages.page_count) {
        pages.page = 1;
    }

    selectedTop();

    window.scrollTo(0, 0);
}