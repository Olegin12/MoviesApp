export function closeModal() {
    let movieInfo = document.getElementById("modal");
    movieInfo.onclick = function () {
        movieInfo.remove();
    }
}