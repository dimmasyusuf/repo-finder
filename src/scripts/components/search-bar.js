class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector("#searchInput").value;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        :host {
          width: 100%;
          height: 100%;
        }

        #form {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          border: 2px solid #24292f;
          border-radius: 10px;
          width: 50%;
          margin: 1rem auto 3rem;
        }
        
        #form input {
          font-family: 'Space Mono', monospace;
          font-size: 1rem;
          color: #24292f;
          border: none;
          outline: none;
          width: 75%;
          padding: 1rem;
          border-radius: 10px 0 0 10px;
        }
        
        #form button {
          font-family: 'Space Mono', monospace;
          font-size: 1rem;
          color: #24292f;
          border: none;
          outline: none;
          background-color: #24292f;
          color: #fff;
          width: 25%;
          padding: 1.2rem 0;
          border-radius: 0 7px 7px 0;
          cursor: pointer;
        }
        
        #form button:hover {
          background-color: #2d333a;
        }
        
        @media (max-width: 576px) {
          #form {
            width: 90%;
          }
        
          #form input {
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-height: 1.5;
            max-height: 1.5;
          }
        
          #form button {
            padding: 1.2rem 0;
          }
        }
        
        @media (min-width: 576px) {
          #form {
            width: 90%;
          }
        }
        
        @media (min-width: 768px) {
          #form {
            width: 80%;
          }
        }
        
        @media (min-width: 992px) {
          #form {
            width: 70%;
          }
        }
        
        @media (min-width: 1200px) {
          #form {
            width: 60%;
          }
        }
      </style>
      <div id="searchBar">
        <form id="form">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for a repository"
          />
          <button type="submit" id="searchButton">search</button>
        </form>
      </div>
    `;

    this.shadowDOM
      .querySelector("#form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this._clickEvent();
        this.shadowDOM.querySelector("#searchInput").value = "";
      });
  }
}

customElements.define("search-bar", SearchBar);
