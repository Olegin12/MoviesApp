import {API_KEY} from "./API_links.js";
import {showStuff} from "./showStuff.js";

export async function getStuff (url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showStuff(respData);
}