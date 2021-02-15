import data from "./data.js";
import {searchMovieByTitle, makeBgActive} from "./helpers.js";

class MoviesApp {
    constructor(options) {
        const {root, searchInput, searchForm, yearHandler, yearSubmitter,year_input, 
            genreHandler, genreSubmitter, genre_input} = options;
        this.$tableEl = document.getElementById(root);
        this.$tbodyEl = this.$tableEl.querySelector("tbody");

        this.$searchInput = document.getElementById(searchInput);
        this.$searchForm   = document.getElementById(searchForm);
        this.yearHandler = yearHandler;
        this.$yearSubmitter = document.getElementById(yearSubmitter);

        this.genreHandler = genreHandler;
        this.$genreSubmitter = document.getElementById(genreSubmitter);

        this.$year_input = document.getElementById("year_input")
        this.$genre_input = document.getElementById("genre_input")
    }

    createMovieEl(movie){
        const {image, title, genre, year,id} = movie;
        return `<tr data-id="${id}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`
    }

    createFilterButtons(type,id, typeName, year, size){
      return `<div class="form-check"><input class="form-check-input" type="${type}" name="${typeName}" id="${typeName}${id}"  value="${year}">
                    <label class="form-check-label" for="${typeName}${id}">
                        ${year}(${size})
                    </label>
          </div>`

    }

    countOfYear(year){
      let count = data.filter((movie) => movie.year === year).length
      return count
    }

    countOfGenre(genre){
      let count = data.filter((movie) => movie.genre === genre).length
      return count
    }

    fillTable(){
        /* const moviesHTML = data.reduce((acc, cur) => {
            return acc + this.createMovieEl(cur);
        }, "");*/
        const moviesArr = data.map((movie) => {
           return this.createMovieEl(movie)
        }).join("");
        this.$tbodyEl.innerHTML = moviesArr;
    }

    fillYearBox(){
      const yearHtml = data.reduce((acc,cur,index) =>{
        return acc + this.createRadioButton(cur)
      }, "")
      this.$year_input.innerHTML = yearHtml
    }

    fillGenreBox(){
      const genreHtml = data.reduce((acc,cur,index) =>{
        return acc + this.createCheckBoxButton(cur,index)
      }, "")
      this.$genre_input.innerHTML = genreHtml
    }

    reset(){
        this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
            item.style.background = "transparent";
        })
    }


    handleSearch(){
        this.$searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.reset();
            const searchValue = this.$searchInput.value;
            const matchedMovies = data.filter((movie) => {
                return searchMovieByTitle(movie, searchValue);
            }).forEach(makeBgActive)

        });
    }

    handleYearFilter(){
        this.$yearSubmitter.addEventListener("click", () => {
            this.reset();
            const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`).value
            const matchedMovies = data.filter((movie) => {
                return movie.year === selectedYear;
            }).forEach(makeBgActive)
        });
    }

     handleGenreFilter(){
        this.$genreSubmitter.addEventListener("click", () => {
            this.reset();
            const selectedGenre = document.querySelectorAll(`input[name='${this.genreHandler}']:checked`).value

            console.log(selectedGenre)
        });
    }

    createRadioButton(movie, index){
      const{year, id} = movie

      let count = this.countOfYear(year)
      return this.createFilterButtons("radio",id,this.yearHandler, year,count)
    }

    createCheckBoxButton(movie, index){
      const{genre, id} = movie
      let count = this.countOfGenre(genre)
      return this.createFilterButtons("checkbox",id,this.genreHandler, genre,count)
    }

    init(){
        this.fillTable();
        this.handleSearch();
        this.handleYearFilter();
        this.fillYearBox();
        this.fillGenreBox();
        this.handleGenreFilter();
    }
}

let myMoviesApp = new MoviesApp({
    root: "movies-table",
    searchInput: "searchInput",
    searchForm: "searchForm",
    yearHandler: "year",
    yearSubmitter: "yearSubmitter",
    year_input: "year_input",
    genreHandler: "genre",
    genreSubmitter: "genreSubmitter",
    genre_input: "genre_input"

});

myMoviesApp.init();
