export class NavFooter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <footer class="footer navbar-dark bg-primary"
        style="
          padding: 1em 0;
          margin-top: 10em;
        "
      >
        <div class="container" style="display: flex; flex-wrap: wrap; align-items: center;justify-content: space-between">
          <div style="font-size: 1.5em;">Movie Collection &copy; 2020</div>
          <img style="width: 15em;" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg">
        </div>
      </footer>
    `;
  }
  static displayFooter() {
    document.querySelector('nav-footer').style.display = 'block';
  }
}
