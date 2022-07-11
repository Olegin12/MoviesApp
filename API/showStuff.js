export function showStuff(data) {
    let stuff = [];
    const modal = document.getElementsByClassName("modal");
    const movieStuff = document.createElement("div");
    movieStuff.classList.add("movie_stuff");
    for (let i = 0; i < 4; i++) {
        stuff[i] = (data[i].nameRu);
    }
    modal[0].insertAdjacentHTML("beforeend", `<div> В ролях: ${stuff.join(', ')} </div>`);
}