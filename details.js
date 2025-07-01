let detail = [];

async function fetchMoviesDetails() {
  try {
    const response = await fetch("https://jsonfakery.com/movies/paginated");
    detail = await response.json();

    displayMoviesDetails();

  } catch (error) {
    document.querySelector(".details-container").innerHTML = "Error fetching movie details";
    console.error("Error fetching movie details:", error);
  }
}

function displayMoviesDetails() {
  const movieId = new URLSearchParams(window.location.search).get("id");
  const movies = JSON.parse(localStorage.getItem("allMovies"));
  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    document.querySelector(".details-container").innerHTML = "Movie not found";
    return;
  }


  document.body.style.backgroundImage = `linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0.4)), url(${movie.backdrop_path})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";


  document.querySelector(".details-container").innerHTML = `
  <div class="hero-section">
    <div class="poster">
      <img src="${movie.poster_path}" alt="${movie.original_title}">
    </div>
    <div class="info">
      <h1 class="movie-titles">${movie.original_title}</h1>
      <div class="tags">
        
        <span class="tag"> Release Date: ${movie.release_date}</span>
       
      </div>
      <div class="ratings">
        <span class="imdb">⭐ ${movie.vote_average}</span>
      </div>
      <p class="overview">${movie.overview}</p>
      <div class="buttons">
        <button class="watch-btn">▶ Watch</button>
        <button class="watchlist-btn">＋ Add to Watchlist</button>
      </div>
    </div>
  </div>
  <div class="cast-section">
    <h2 class="cast-title"><strong>Cast of ${movie.original_title}</strong></h2>
    <div class="cast-list"></div>
  </div>
`;
 
    const castList = document.querySelector(".cast-list");
    movie.casts.forEach(cast => {
      const castCard = document.createElement("div");
      castCard.classList.add("cast-member");
      castCard.innerHTML = `
        <img src="${cast.profile_path}" alt="${cast.name}" class="cast-photo">
        <div class="cast-name">${cast.name}</div>
        <div class="cast-role">${cast.character}</div>
      `;
      castList.appendChild(castCard);
    });
  
}




fetchMoviesDetails();



document.querySelector(".home-button").addEventListener("click", () => {
  window.location.href = "index.html";})