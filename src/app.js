import Navbar from "./components/navbar";
import { SearchResults } from "./components/searchresults";
import { PopularMovies } from "./components/popularmovies";
import { TrendingMovies } from "./components/trendingmovies";
import { MovieDetails } from "./components/moviedetails";
import { MovieTopCast } from "./components/movietopcast";
import { MovieFacts } from "./components/moviefacts";
import { NavFooter } from "./components/navfooter";
import { ClickSearch } from "./components/clicksearch";

// Add Function to window object so it can be call on template (ex. onclick, etc)
window.AddedFunctionOnWindow = {
  movieSelected: (movieId) => {
    sessionStorage.setItem('movieId', movieId);
    window.location = 'movie';
  },
};


function App() {
  document.onkeydown = function (e) {
   if(e.which == 9){
    return false;
   }
  }
  window.customElements.define('nav-bar', Navbar);
  window.customElements.define('click-search', ClickSearch);
  window.customElements.define('nav-footer', NavFooter);
  window.customElements.define('search-results', SearchResults);
  window.customElements.define('popular-movies', PopularMovies);
  window.customElements.define('trending-movies', TrendingMovies);
  window.customElements.define('movie-details', MovieDetails);
  window.customElements.define('movie-top-cast', MovieTopCast);
  window.customElements.define('movie-facts', MovieFacts);
}

App();
