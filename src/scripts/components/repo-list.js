import "./repo-item";

class RepoList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set repos(repos) {
    this._repos = repos;
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

        :host {
          width: 100%;
          height: 100%;
        }

        #repoList {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          padding: 0.5rem;
        }
        
        repo-item {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          width: 46%;
          height: 100%;
          margin: 0.5rem;
          border: 2px solid #24292f;
          border-radius: 10px;
          padding: 1rem;
          transition: all 0.3s ease-in-out;
          overflow: hidden;
        }

        .repo-result {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin: 1rem auto;
          width: 85%;
        }

        @media (max-width: 576px) {
          #repoList {
            width: 90%;
            padding: 0;
          }

          repo-item {
            width: 100%;
            margin: 0.5rem 0;
          }

          .repo-result {
            width: 90%;
          }
        }

        @media (min-width: 576px) {
          #repoList {
            width: 90%;
            padding: 0;
          }

          repo-item {
            width: 100%;
            margin: 0.5rem 0;
          }

          .repo-result {
            width: 90%;
          }
        }

        @media (min-width: 768px) {
          #repoList {
            width: 80%;
            padding: 0;
          }

          repo-item {
            width: 100%;
            margin: 0.5rem 0;
          }

          .repo-result {
            width: 80%;
          }
        }

        @media (min-width: 992px) {
          #repoList {
            width: 90%;
            padding: 0;
          }

          repo-item {
            width: 46%;
            margin: 0.5rem 0;
          }

          .repo-result {
            width: 85%;
          }
        }

        @media (min-width: 1200px) {
          #repoList {
            width: 90%;
            padding: 0;
          }

          repo-item {
            width: 46%;
            margin: 0.5rem 0;
          }

          .repo-result {
            width: 85%;
          }
        }
      </style>
      <h4 class="repo-result">${this._repos.length} repository results</h4>
      <div id="repoList"></div>
    `;

    if (this._repos.length === 0) {
      this.renderError("No repository found");
      return;
    } else if (this._repos.length === 1) {
      this.shadowDOM.querySelector(".repo-result").style.justifyContent =
        "center";
    }

    this._repos.forEach((repo) => {
      const repoItemElement = document.createElement("repo-item");
      repoItemElement.repo = repo;
      this.shadowDOM.querySelector("#repoList").appendChild(repoItemElement);
    });
  }

  renderError(message) {
    this.shadowDOM.innerHTML = `
      <style>
        .placeholder {
          font-weight: lighter;
          color: rgba(0,0,0,0.5);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }
      </style>
    `;

    this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  }
}

customElements.define("repo-list", RepoList);
