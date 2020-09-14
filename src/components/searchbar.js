import { getSearchMovies } from "../request";
import { Navbar } from "./navbar";

export class SearchBar extends HTMLElement {
	constructor() {
		super();
		this.UISelectors = {
			bodyEL: document.querySelector("body"),
		};
		this.searchValue = ``;
		this.innerHTML = `
      <div class="form-group">
        <label class="col-form-label col-form-label-lg" for="moviesearch"></label>
        <input
          class="form-control" 
          type="text" placeholder="Search" 
          id="search-form"
        >
      </div>
      <button type="submit" id="submit-search" class="btn btn-primary">Submit</button>
    `;
	}
	connectedCallback() {
		this.UISelectors.bodyEL.addEventListener("keyup", (e) => {
			e.preventDefault();
			if (e.target.id === "search-form") {
				this.searchValue = e.target.value;
			}
			if (e.keyCode === 13 && !this.searchValue == ``) {
				e.preventDefault();
				Navbar.runProgressBar();
				this.searchMovie();
			}
		});
		this.UISelectors.bodyEL.addEventListener("click", (e) => {
			if (e.target.id === "submit-search" && !this.searchValue == ``) {
				e.preventDefault();
				this.searchMovie();
			}
		});
	}

	searchMovie() {
		document.querySelector("#loader").style.display = " block";
		document.querySelector("#search-results-list").style.display = "none";
		getSearchMovies(this.searchValue);
	}
}
