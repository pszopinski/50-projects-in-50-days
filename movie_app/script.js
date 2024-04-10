async function fetchMovieData(endpoint, searchParams) {
  const BASE_URL = "https://api.themoviedb.org/3/";
  const HEADERS = {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzQ5OWVkYmUyNDY1NDVjYzQyNWRmNTE3MWUzMDA3YiIsInN1YiI6IjY2MTZiOGRmN2E0ZWU3MDE2MzBhNDlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D7PBPoOd2NoYArj-dQWUwrDlnSI10LqA-XHd8HJW-zk",
  };

  const queryString = new URLSearchParams(searchParams).toString();
  const url = new URL(`${endpoint}?${queryString}`, BASE_URL);

  return fetch(url, { headers: HEADERS });
}

async function getMovies() {
  const response = await fetchMovieData("discover/movie", {
    sort_by: "popularity.desc",
    include_adult: true,
  });
  const json = await response.json();
  return json.results;
}

function update(movies) {
  document
    .querySelector("#movies")
    .replaceChildren(...movies.map(MovieElement));
}

function MovieElement(movie) {
  const { id, poster_path, title, vote_average, overview } = movie;

  let article = document.createElement("article");
  article.classList.add("movie");
  article.innerHTML = `\
    <article tabindex="0">
      <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}" alt="${title} Poster" />
      <footer>
        <h2 class="title">${title}</h2>
        <div class="rating ${getRatingClass(vote_average)}">
          ${vote_average.toFixed(1)}
        </div>
      </footer>
      <div class="overview">
        <h3>${title}</h3>
        <p>${overview}</p>
        <p class="see-more">
          <a href="https://www.themoviedb.org/movie/${id}" target="_blank">See more</a>
        </p>
      </div>
    </article>`;

  return article;
}

function getRatingClass(rating) {
  if (rating >= 7) {
    return "green";
  }

  if (rating >= 5) {
    return "yellow";
  }

  return "red";
}

getMovies().then(update);
