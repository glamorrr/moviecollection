import moment from "moment";
import { getSearchMovies } from '../request';
import Navbar from "./navbar";

export class SearchResults extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
			<div id="search-results-list" style="margin-top: 4em">
			</div>
		`;
	}
	connectedCallback() {
		const searchValue = sessionStorage.getItem('Search');
		getSearchMovies(searchValue);
	}

	static displaySearchResults(response) {
		let template = ``;
		document.querySelector("#search-results-list").innerHTML = `<h3 style='font-weight:600'>Search Results: <span style="font-weight: 500; opacity: 0.8; font-style: italic;">${sessionStorage.getItem('Search')}</span></h3>`;
		if (response.data.results == "") {
			document.querySelector('nav-footer').style.position = "absolute";
			document.querySelector('nav-footer').style.bottom = "0";
			document.querySelector('nav-footer').style.width = "100%";
			template = `
				<h4>There are no movies that matched your query.</h4>
			`;
			document.querySelector("#search-results-list").innerHTML = template;
		} else {
			response.data.results.forEach((movie) => {
				template = `
            <div class="movie-card">
              <a
                class="click-movie-info"
                onclick="AddedFunctionOnWindow.movieSelected(${movie.id})"
              >
                <div
                  class="no-image-poster no-image-poster-search"
                >
                  <div
                    class="search-movie-poster"
                    style="background-image: url(https://image.tmdb.org/t/p/w200/${movie.poster_path
					});"
                  ></div>
                </div>
              </a>

              <section class="movie-description">
                <a
                  class="click-movie-info"
                  onclick="AddedFunctionOnWindow.movieSelected(${movie.id})"
                >
                  <h1 style="color: white">${movie.title}</h1>
                </a>
                <span id="movie-release-date-year">${moment(movie.release_date).year() || '----'}</span>
                <p><span>${movie.overview}</span></p>
              </section>
            </div>
          `;
				document.querySelector("#search-results-list").innerHTML += template;
			});
		}
		document.querySelector("#search-results-list").style.display = "block";
	}
}
