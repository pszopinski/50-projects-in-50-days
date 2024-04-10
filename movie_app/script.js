async function fetchMovieData(endpoint, searchParams) {
  const BASE_URL = "https://api.themoviedb.org/3/";
  const HEADERS = {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzQ5OWVkYmUyNDY1NDVjYzQyNWRmNTE3MWUzMDA3YiIsInN1YiI6IjY2MTZiOGRmN2E0ZWU3MDE2MzBhNDlhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D7PBPoOd2NoYArj-dQWUwrDlnSI10LqA-XHd8HJW-zk",
  };

  const queryString = new URLSearchParams(searchParams).toString();
  const url = new URL(`${endpoint}?${queryString}`, BASE_URL);

  return fetch(url, { HEADERS });
}

async function getMovies() {
  const response = await fetchMovieData("discover/movie", {
    sort_by: "popularity.desc",
    include_adult: true,
  });
  const json = await response.json();
  return json.results;
}

getMovies().then(console.log);
