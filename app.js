let page = 1;
const API_KEY = "05e9a602-4603-45a6-9230-615c4c905ab0";

const API_URL_POPULAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`;
const API_URL_AWAIT = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=${page}`;
const API_URL_TOP250 = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`;

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
    showMovies(respData)
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
                        `;
        moviesEl.appendChild(movieEl);
    });
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
const pageNumber = document.getElementById('pageNumber');

next.onclick = function () {
    page ++;
    if (page >= 7) {
        page = 7;
    }
    pageNumber.innerHTML=`${page}/7`;
    getMovies(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`);
    window.scrollTo(0, 0);
}

prev.onclick = function () {
    page --;
    if (page < 1) {
        page = 1;
    }
    pageNumber.innerHTML=`${page}/7`;
    getMovies(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`);
    window.scrollTo(0, 0);
}



function changeTop() {
    let top = document.getElementById('header_select').selectedIndex + 1;

    switch (top) {
        case 1:
            getMovies(API_URL_POPULAR)
            break

        case 2:
            getMovies(API_URL_TOP250)
            break

        case 3:
            getMovies(API_URL_AWAIT)
            break;
    }
}