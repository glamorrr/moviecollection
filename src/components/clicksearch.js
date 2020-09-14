import { getSearchMovies } from '../request';

export class ClickSearch extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <a
        style="
          font-size: 1.5em;
          cursor:pointer;
          line-height: 1em;
        "
        id="click-search"
      >
        <svg id="search-icon-open" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
          <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
        <div id="search-icon-closed" style="display:none; font-size: 1.5em; line-height: 0.7em;">&times;</div>
      </a>
    `;
    this.searchState = false;
  }
  connectedCallback() {
    if (window.location.pathname === '/search') {
      ClickSearch.displayInputSearch(!this.searchState);
    }
    document.querySelector('#click-search').addEventListener('click', e => {
      this.searchState = !this.searchState;
      ClickSearch.displayInputSearch(this.searchState);
    });
  }
  static displayInputSearch(bool) {
    if (bool) {
      document.querySelector('.search-form-section').style.display = 'block';
      document.querySelector('#search-icon-open').style.display = 'none';
      document.querySelector('#search-icon-closed').style.display = 'block';
    } else {
      document.querySelector('.search-form-section').style.display = 'none';
      document.querySelector('#search-icon-open').style.display = 'block';
      document.querySelector('#search-icon-closed').style.display = 'none';
    }
  }
  static changePageToSearch(searchValue) {
    sessionStorage.setItem('Search', searchValue);
    if (!(window.location.pathname === 'search')) {
      window.location = 'search'
    } else {
      getSearchMovies();
    }
  }
}
