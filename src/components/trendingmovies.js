import { getTrendingMovies } from "../request";
import moment from "moment";

export class TrendingMovies extends HTMLElement {
  constructor() {
    super();
    this.UISelectors = {
      bodyEL: document.querySelector("body"),
    };
    this.innerHTML = `
      <div id="most-trending-movies" style="margin-top: 4em">
      </div>`;
  }
  connectedCallback() {
    getTrendingMovies();
  }

  static displayTrendingMovies(response) {
    document.querySelector("#most-trending-movies").innerHTML = `
      <h1>Trending Movies</h1>
      <section>
      </section>
    `;
    let template = ``;
    response.forEach((movie) => {
      template = `
        <div class="movie-list">
          <div class="no-image-poster">
            <a
              class="click-movie-info"
              onclick="AddedFunctionOnWindow.movieSelected(${movie.id})"
            >
              <div
                class="movie-image"
                style="background-image: url(https://image.tmdb.org/t/p/w500/${
                  movie.poster_path
                });"
              ></div>
            </a>
          </div>
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
        "#most-trending-movies section"
      ).innerHTML += template;
    });
  }
}
