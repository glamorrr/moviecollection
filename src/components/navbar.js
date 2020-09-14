import { ClickSearch } from './clicksearch';
import { ui } from '../ui';

class Navbar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `
		<div class="progress"
		style="
			top: 50;
			position: absolute;
			width: 100%;
			height: 5px;
			border-radius: 0;
			z-index: 10;
		">
		<div id="progress-loading-page" style="width: 0%" class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
	</div>
			<div class="">
				<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container">
            <a class="navbar-brand"
              style = "
                font-weight: 800;
                line-height: 1em;
                font-size: 2em;
              "
              href="/" target="_self">Movie Collection</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" style="font-size: 1.2em; font-weight: 600;" href="${this.getAttribute(
			"linkToPage"
		)}">About <span class="sr-only">(current)</span></a>
                </li>
              </ul>
            </div>

            <click-search></click-search>
          </div>
        </nav>
				
        <div class="search-form-section">
          <form class="container" id="search-form" style="">
              <div class="form-group">
                <label id="search-form-icon">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                  </svg>
                </label>
                <input autocomplete="off" id="search-form-input" placeholder="Search for a movie..." class="form-control" type="text"/>
              </div>
          </form>
        </div>
      </div>
    `;
	}

	connectedCallback() {
		switch (window.location.pathname) {
			case '/about':
				document.querySelector('.progress').style.display = 'none';
				break;
			case '/movie':
				Navbar.runProgressBar();
				break;
			case '/search':
				document.querySelector('#search-form-input').value = sessionStorage.getItem('Search');
				Navbar.runProgressBar();
				break;
			default:
				Navbar.runProgressBar();
		}
		document.querySelector('#search-form').addEventListener('submit', (e) => {
			e.preventDefault();
			let inputSearch = document.querySelector('#search-form-input');
			ClickSearch.changePageToSearch(inputSearch.value);
		});
	}

	static runProgressBar() {
		ui.intervalProgressBar = setInterval(() => {
			ui.progressBarWidth += 1;
			document.querySelector('#progress-loading-page').style.width = `${ui.progressBarWidth}%`;
			if (ui.progressBarWidth >= 100) {
				clearInterval(ui.intervalProgressBar);
			}
		}, 100);
	}

	static completeIntervalProgressBar() {
		let progressBar = document.querySelector('#progress-loading-page');
		document.querySelector('.progress').style.transition = 'height 1s';
		progressBar.style.transition = 'width 0.5s';
		clearInterval(ui.intervalProgressBar);
		for (let i = ui.progressBarWidth; i <= 101; i += 1) {
			progressBar.style.width = `${i}%`;
		}
		if (progressBar.style.width >= '100vw') {
			document.querySelector('.progress').style.height = 0;
		}
	}

}
export default Navbar;
