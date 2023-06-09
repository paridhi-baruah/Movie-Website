var search=document.getElementById("search");
search.onclick= function(){
    search.className="quick-search";
}
var elements = document.querySelectorAll(".search-results");
var myFunction = function() {
    this.className="search-click";
}
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', myFunction,false);
}

const API_KEY= "api_key=f7573771aab31b901b8c29059bf9346e";
const BASE_URL= "https://api.themoviedb.org/3";
const API_URL= BASE_URL+ "/discover/movie?sort_by=popularity.desc&" +API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL +"/search/movie?"+API_KEY;

const main=document.getElementById("movie-content");
const searchBar=document.getElementById("search-bar");
// const submit=document.getElementById("submit");

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML=``;
    data.forEach(movie => {
        const {title,poster_path,vote_average}=movie;
        const movieL=document.createElement('div');
        movieL.classList.add('movie-grid');
        movieL.innerHTML =`
        <img src="${IMG_URL+poster_path}" class="hall">
        <div class="movie-details">
            <div class="title">
                ${title}
            </div>
            <div class="rate">
                ${vote_average}
            </div>
        </div>
        `
        main.appendChild(movieL);
    });
}

searchBar.addEventListener('submit',(e)=> {
    e.preventDefault();
    const searchTerm=search.value;
    if(searchTerm)
    {
        getMovies(searchURL+'&query='+searchTerm);
    }
    else
    {
        getMovies(API_URL);
    }
});
