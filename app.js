const API_KEY = "05e9a602-4603-45a6-9230-615c4c905ab0";
let page = 1;
let page_count;


const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_AWAIT = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=";
const API_URL_TOP250 = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=";
const API_URL_INFO = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const API_URL_STAFF = "https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=";

/* const API_URL_PREMIER = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=JANUARY";
* TRY to get movies from premier*/

const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR + page);

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
        movieEl.addEventListener('click', function (e) {
            getMovieInformation(API_URL_INFO + movie.filmId)
        })
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
                <button class="more_information">Подробнее</button>
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

async function getStaff (url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showStuff(respData);
}

function showStuff(data) {
    let stuff = [];
    const modal = document.getElementsByClassName("modal");
    const movieStuff = document.createElement("div");
    movieStuff.classList.add("movie_stuff");
    for (var i = 0; i < 4; i++) {
        stuff[i] = (data[i].nameRu);
    }
    movieStuff.innerHTML = `
    <div>${stuff.join(', ')}</div>`;
    modal[0].appendChild(movieStuff);
}

function showMovieInfo(movieData) {
    //console.table(movieData);
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("modal");
    movieInfo.innerHTML = `
        <div class="modal_movie_title">${movieData.nameRu}</div>
        <div class="modal_movie_year">${movieData.year}</div>
        <div class="modal_movie_category">${movieData.genres.map(
            (genre) => ` ${genre.genre}`
        )}</div>
        <img 
            src="${movieData.posterUrlPreview}"
            class="modal_movie_cover"
            alt="${movieData.nameRu}"
            >
        <div class="modal_movie_info">${movieData.description}</div>
        <button onclick="closeModal()" class="modal_button_close">×</button>
    `;
    getStaff(API_URL_STAFF + movieData.kinopoiskId);
    document.body.appendChild(movieInfo);
    window.onclick = function (e) {
        if (e.target == movieInfo) {
            movieInfo.remove();
        }
    }
}

function closeModal() {
    var movieInfo = document.getElementsByClassName("modal");
    for(var i=0; i<movieInfo.length; i++) {
        movieInfo[i].remove();
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

    window.scrollTo(0, 0);
}

prev.onclick = function () {
    page --;

    if (page < page_count) {
        page = 1;
    }

    selectedTop();

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
