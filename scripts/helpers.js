export const searchMovieByTitle = (movie, searchValue) => {
  return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
}

export const makeBgActive = (movie) => {
  document.querySelector(`tr[data-id='${movie.id}']`).style.background = "#d7f0f7";
}

export const makeBgGenreActive = (movie) => {
    const movieEl = document.querySelector(`tr[data-id='${movie.id}']`);
      if(movie.genre.toLowerCase() == "action"){
        movieEl.style.background = "#ff0000"
      }
      if(movie.genre.toLowerCase() == "drama"){
         movieEl.style.background = "#ffb400"
      }
      if(movie.genre.toLowerCase() == "adventure"){
         movieEl.style.background = "#00ca00"
      }
      if(movie.genre.toLowerCase() == "biography"){
         movieEl.style.background = "#0069b0"
      }
      if(movie.genre.toLowerCase() == "crime"){
         movieEl.style.background = "#e369b0"
      }
      if(movie.genre.toLowerCase() == "western"){
         movieEl.style.background = "#b5b441"
      }
  
}