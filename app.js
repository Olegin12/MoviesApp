const API_KEY = "05e9a602-4603-45a6-9230-615c4c905ab0";
let page = 1;
let page_count;


const API_URL_POPULAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`;
const API_URL_AWAIT = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=${page}`;
const API_URL_TOP250 = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`;
const API_URL_INFO = `https://kinopoiskapiunofficial.tech/api/v2.2/films/`

const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
    page_count = respData.pagesCount;
    document.getElementById('pageNumber').innerHTML=`${page}/${page_count}`;
}

function getClassByRate(votes) {
    if (votes >= 7.5) {
        return "green";
    } else if (votes >=5) {
        return "orange";
    } else {
        return "red";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML ="";

    data.films.forEach(movie => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
           <div class="movie_cover-inner">
                    <img
                            src="${movie.posterUrlPreview}"
                            class="movie_cover"
                            alt="${movie.nameRu}">
                    <div class="movie_cover-dark"></div>
                </div>
                <div class="movie_info">
                    <div class="movie_title">${movie.nameRu}</div>
                    <div class="movie_category">${movie.genres.map(
                        (genre) => ` ${genre.genre}`
                    )}</div>
                    <div class="movie_average movie_average-${getClassByRate(movie.rating)}">${movie.rating}</div>
                </div>
                <button class="more_information" onclick="getMovieInformation(API_URL_INFO + ${movie.filmId})">Подробнее</button>
                        `;
        moviesEl.appendChild(movieEl);
    });
}

async function getMovieInformation (url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovieInfo(respData);
}

function showMovieInfo(movieData) {
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("modal");
    movieInfo.innerHTML = `
    <div>${movieData.nameRu}</div>
    <div>${movieData.genres}</div>
    <img 
        src="${movieData.posterUrlPreview}"
        class="movie_cover"
        alt="${movieData.nameRu}"
        >
    <div>${movieData.description}</div>
    <button onclick="closeModal()" class="close">×</button>`;
    document.body.appendChild(movieInfo);
    window.onclick = function (e) {
        if (e.target == movieInfo) {
            movieInfo.style.display = "none";
        }
    }
}

function closeModal() {
    var movieInfo = document.getElementsByClassName("modal");
    for(var i=0; i<movieInfo.length; i++) {
        movieInfo[i].style.display='none';
    }
}

const form = document.querySelector("form");
const search = document.querySelector(".header_search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
      getMovies(apiSearchUrl);
      search.value = "";
  }
})

const next = document.getElementById('next');
const prev = document.getElementById('prev');

next.onclick = function () {
    page ++;
    if (page >= page_count) {
        page = page_count;
    }

    selectedTop()
    /*TODO  smth with page number*/

    window.scrollTo(0, 0);
}

prev.onclick = function () {
    page --;

    if (page < page_count) {
        page = 1;
    }

    selectedTop();
    /*TODO  smth with page number*/

    window.scrollTo(0, 0);
}

function selectedTop () {
    let top = document.getElementById('header_select').selectedIndex + 1;

    switch (top) {
        case 1:
            getMovies(API_URL_POPULAR + page)
            break

        case 2:
            getMovies(API_URL_TOP250 + page)
            break

        case 3:
            getMovies(API_URL_AWAIT + page)
            break;
    }
}
