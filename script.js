let result=[];

async function fetchMovies(){
  try{
    const response = await fetch("https://jsonfakery.com/movies/paginated");
    result = await response.json();

    localStorage.setItem("allMovies", JSON.stringify(result.data));
    
    displayMovies();
  }catch(error){
    document.querySelector(".movie-container").innerHTML = "Error fetching movies";
    console.error("Error fetching movies:", error);
  }
  
};

function displayMovies(){
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = "";

  result.data.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML =`
                          <img src= ${movie.poster_path} alt="${movie.original_title}" class="movie-poster">
                          <h3 class="movie-title">${movie.original_title}</h3>
                          `;   
                          movieCard.addEventListener("click", () => {
                            window.location.href = `details.html?id=${movie.id}`;
                          });
                                            
    movieContainer.appendChild(movieCard);
  });
}

document.querySelector(".home").addEventListener("click", () => {
  window.location.href = "index.html";
});



fetchMovies();