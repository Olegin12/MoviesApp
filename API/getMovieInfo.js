import {API_KEY} from "./API_links.js";
import {showMovieInfo} from "./showMovieInfo.js";

export async function getMovieInformation (url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovieInfo(respData);
}