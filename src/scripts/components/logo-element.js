class LogoElement extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .logo {
          font-family: 'Space Mono', monospace;
          font-size: 3rem;
          font-weight: 700;
          color: #24292f;
          text-decoration: none;
          text-align: center;
          padding: 2rem;
        }
        
        .logo a {
          color: #24292f;
          text-decoration: none;
        }
      </style>
      <div id="logoElement">
        <h1 class="logo">
          <a href="/">Repo Finder</a>
        </h1>
      </div>
    `;
  }
}

customElements.define("logo-element", LogoElement);
