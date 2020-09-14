import { getPopularMovies } from "../request";
import moment from "moment";

export class PopularMovies extends HTMLElement {
  constructor() {
    super();
    this.UISelectors = {
      bodyEL: document.querySelector('body'),
    };
    this.innerHTML = `
      <div id="most-popular-movies" style="margin-top: 4em">
      </div>`;
  }
  connectedCallback() {
    getPopularMovies();
  }

  static displayPopularMovies(response) {
    document.querySelector("#most-popular-movies").innerHTML = `
      <h1>Popular Movies</h1>
      <section></section>
    `;
    let template = ``;
    response.forEach((movie) => {
      template = `
        <div class="movie-list">
          <a
            class="click-movie-info"
            onclick="AddedFunctionOnWindow.movieSelected(${movie.id})"
          >
            <div class="no-image-poster">
              <div
                class="movie-image"
                style="background-image: url(https://image.tmdb.org/t/p/w500/${
                  movie.poster_path
                });"
              ></div>
            </div>
          </a>
          <div class="movie-list-description">
            <a
              class="click-movie-info"
              onclick="AddedFunctionOnWindow.movieSelected(${movie.id})"
            >
              <h1>${movie.title}</h1>
            </a>
            <span>${moment(movie.release_date).year()}</span>
          <div>
        </div>
    `;
      document.querySelector(
        "#most-popular-movies section"
      ).innerHTML += template;
    });
  }
}
