import { getMovieById } from "../request";
import moment from "moment";

export class MovieDetails extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '';
  }
  connectedCallback() {
    getMovieById();
  }
  static displayMovieDetails(resMovie, resMovieCredits) {
    const movie = resMovie.data;
    const movieCredits = resMovieCredits.data;
    document.title = `${movie.title} (${moment(movie.release_date).year()})`;
    let template = '';
    template = `
      <div id="movie-details-no-backdrop" >
        <div
          id="movie-details-backdrop"
          style="background-image: url(https://image.tmdb.org/t/p/original/${
            movie.backdrop_path
          });"
        >
          <div id="custom-bg">
            <div class="container">
              <div>
                <div id="movie-details-no-image-poster">
                  <div
                    id="movie-details-movie-image"
                    style="background-image: url(https://image.tmdb.org/t/p/w500/${
                      movie.poster_path
                    });"
                  ></div>
                </div>
              </div>
              <section>
                <h1>${movie.title} <span>(${moment(movie.release_date).year()})</span></h1>
                <p>${MovieDetails.displayGenres(movie.genres)} &bull; ${MovieDetails.displayRuntimeHour(movie.runtime)}</p>
                <h2>Overview</h2>
                <p>${movie.overview}</p>
                <h2>Director</h2>
                <p>${MovieDetails.displayMovieDirector(movieCredits.crew)}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <section id="movie-details-phone">
        <h1>${movie.title} <span>(${moment(movie.release_date).year()})</span></h1>
        <span id="movie-genre-runtime"><p>${MovieDetails.displayGenres(movie.genres)} &bull; ${MovieDetails.displayRuntimeHour(movie.runtime)}</p></span>
        <div id="movie-overview-director">
          <h2>Overview</h2>
          <p>${movie.overview}</p>
          <h2 style="margin-top: 1em;">Director</h2>
          <p>${MovieDetails.displayMovieDirector(movieCredits.crew)}</p>
        </div>
        <hr style="border-top: 1px solid gray; margin: 0;">
      </section>
      <div class="container" style="margin-top: 2em;">
        <div id="movie-topcast-facts" class="row">
          <movie-top-cast class="col-9"></movie-top-cast>
          <hr style="border-top: 1px solid gray; margin: 2em 0 0 0;">
          <movie-facts class="col-3"></movie-facts>
        </div>
      </div>
    `;
    document.querySelector('movie-details').innerHTML = template;
  }

  static displayGenres(genres) {
    let output = '';
    genres.forEach((genre,i) => {
      if (i === genres.length-1 ) {
        output += `<span>&nbsp;${genre.name}</span>`
      } else {
        output += `<span>&nbsp;${genre.name},</span>`
      }
    });
    return output;
  }
  static displayRuntimeHour(runtime) {
    let movieRuntime = new Date();
    movieRuntime.setHours(0, runtime, 0);
    const hour = movieRuntime.getHours();
    const minutes = movieRuntime.getMinutes();
    let output = '';
    output = `${hour}h ${minutes}m`
    return output;
  }
  static displayMovieDirector(crew) {
    let output = '';
    crew.forEach(person => {
      if(person.job === "Director") {
        output = `<span>${person.name}</span>`;
        return;
      }
    });
    return output;
  }
}
