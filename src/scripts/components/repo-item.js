import "./repo-topic";

class RepoItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set repo(repo) {
    this._repo = repo;
    this.render();
  }

  formattedStar = (star) => {
    if (star >= 1000) {
      return `${(star / 1000).toFixed(1)}k`;
    } else {
      return star;
    }
  };

  formattedDate = (date) => {
    const dateObj = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - dateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) {
      return `${diffDays} days ago`;
    } else {
      const dateObj = new Date(date);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return `Updated on ${dateObj.toLocaleDateString("en-US", options)}`;
    }
  };

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .repo-link {
          text-decoration: none;
          color: #24292f;
          width: 100%;
          border-radius: 10px;
        }
        
        .repo-link:hover {
          color: #24292f;
        }
        
        .repo-item_body {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 0.5rem;
        }
        
        .repo-title {
          font-family: 'Space Mono', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: #24292f;
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          line-height: 1.5;
          max-height: 1.5;
        }
        
        .repo-text {
          font-family: 'Space Mono', monospace;
          font-size: 1rem;
          color: #24292f;
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-height: 1.5;
          max-height: 3;
        }
        
        .repo-item_topic {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          padding: 0 0.2rem;
          margin-bottom: 0.5rem;
        }

        .repo-topic {
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          color: #fff;
          text-align: center;
          background-color: #24292f;
          border: 1px solid #24292f;
          border-radius: 10px;
          padding: 0.3rem;
          margin: 0.3rem;
        }
        
        .repo-topic:hover {
          background-color: #fff;
          color: #24292f;
        }
        
        .repo-item_footer {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          border: none;
        }
        
        .repo-meta_item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          width: auto;
          margin: 0 0.5rem;
        }
        
        .repo-meta_item span {
          margin: 0.5rem 0.2rem;
        }
      </style>
      <div class="repo-item">
        <a href="${this._repo.html_url}" class="repo-link">
          <div class="repo-item_body">
            <h5 class="repo-title">${this._repo.full_name}</h5>
            <p class="repo-text">${this._repo.description}</p>
          </div>
          <div class="repo-item_topic">
          </div>
          <div class="repo-item_footer">
            <div class="repo-meta_item">
              <box-icon name="star"></box-icon>
              <span>${this.formattedStar(this._repo.stargazers_count)}</span>
            </div>
            <div class="repo-meta_item">
              <box-icon name="code"></box-icon>
              <span>${this._repo.language}</span>
            </div>
            <div class="repo-meta_item">
              <span>${this.formattedDate(this._repo.updated_at)}</span>
            </div>
          </div>
        </a>
      </div>
    `;

    const repoMetaItem = this.shadowDOM.querySelectorAll(".repo-meta_item");
    repoMetaItem.forEach((item) => {
      if (item.innerText.includes("null")) {
        item.remove();
      }
    });

    this._repo.topics.forEach((topic) => {
      const topicElement = document.createElement("span");
      topicElement.setAttribute("class", "repo-topic");
      topicElement.innerText = topic;
      this.shadowDOM
        .querySelector(".repo-item_topic")
        .appendChild(topicElement);
    });
  }
}

customElements.define("repo-item", RepoItem);
