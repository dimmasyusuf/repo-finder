class RepoTopic extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set topic(topic) {
    this._topic = topic;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <span class="repo-topic">${this._topic}</span>
    `;
  }
}

customElements.define("repo-topic", RepoTopic);
