import {API_KEY} from "./API_links.js";
import {showMovies} from "./showMovies.js";

export let pages = {
    page: 1,
    page_count: 1
};

export async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    /*
    Promise.race([resp]).then(() => {
        document.getElementById("preloader").style.display = "none";
    })
    */
    const respData = await resp.json();
    showMovies(respData);
    pages.page_count = respData.pagesCount;
    document.getElementById('pageNumber').innerHTML=`${pages.page}/${pages.page_count}`;
}