import moment from "moment";

export class MovieFacts extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '';
  }
  static displayMovieFacts(movie) {
    let output = '';
    output = `
      <section>
        <h1>Original Title</h1>
        <p>${movie.original_title}</p>
      </section>
      <section>
        <h1>Release Date</h1>
        <p>${this.displayReleaseDate(movie.release_date)}</p>
      </section>
      <section>
        <h1>Status</h1>
        <p>${movie.status}</p>
      </section>
      <section>
        <a class="btn-imdb" href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank">IMDb</a>
      </section>
    `;
    document.querySelector('movie-facts').innerHTML += output;
  }
  static displayReleaseDate(date) {
    let output = '';
    const releaseDate = new Date(date);
    const day = releaseDate.getDate();
    const month = releaseDate.toLocaleString('default', { month: 'long' });
    const year = releaseDate.getFullYear();
    output = `${day} ${month} ${year}`;
    return output;
  }
}
