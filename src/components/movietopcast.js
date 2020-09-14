export class MovieTopCast extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <h1 id="movie-top-cast-title">Top Cast</h1>
      <div id="movie-top-cast-cards"></div>
    `;
  }
  static displayMovieTopCast(movieCast) {
    const movieTopCast = this.filterMovieTopCast(movieCast);
    let template = '';
    if (movieTopCast == '') {
      template = '<p style="margin-top: 1.5em;font-size: 1.5em;">No cast found in database</p>'
      document.querySelector('#movie-top-cast-cards').style.overflow = 'hidden';
    } else {
      movieTopCast.forEach(cast => {
        template += `
          <div class="card">
            <div style="
              border-top-left-radius: inherit;
              border-top-right-radius: inherit;
              background-image: url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg');
              background-position: center;
              background-size: 75px;
              background-color: #dbdbdb;
              background-repeat: no-repeat;
              width: 138px;
              height: 175px;
            ">
              <div class="card-img-top" style="background-image: url('https://image.tmdb.org/t/p/w138_and_h175_face/${cast.profile_path}')" alt="Card image cap"></div>
            </div>
            <div class="card-body">
              <h1>${cast.name}</h1>
              <p class="card-text">${cast.character}</p>
            </div>
          </div>
        `;
      });
    }
    document.querySelector('#movie-top-cast-cards').innerHTML += template;
  }
  static filterMovieTopCast(movieCast) {
    let movieTopCast = [];
    for (let i = 0; i <= (movieCast.length - 1); i++) {
      movieTopCast.push(movieCast[i]);
      if (i === 9) {
        break;
      }
    }
    return movieTopCast;
  }
}
