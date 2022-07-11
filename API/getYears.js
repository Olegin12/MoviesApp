export function getYearsInfo(movieData) {
    const modal = document.getElementsByClassName("modal");
    const yearsInfo = document.createElement("div");

    if (movieData.serial) {
        if (movieData.endYear === null) {
            yearsInfo.innerHTML = `
                <div class="modal_movie_year">${movieData.year} - ...</div>
            `;
        } else {
            yearsInfo.innerHTML = `
                <div class="modal_movie_year">${movieData.year} - ${movieData.endYear}</div>
            `;
        }
    } else {
        yearsInfo.innerHTML = `
        <div class="modal_movie_year">${movieData.year}</div>`;
    }
    modal[0].appendChild(yearsInfo);
}