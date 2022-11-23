import "../components/repo-list";
import "../components/search-bar";
import DataSource from "../data/data-source";

const main = () => {
  const searchElement = document.querySelector("search-bar");
  const repoListElement = document.querySelector("repo-list");

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchRepo(searchElement.value);
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  const renderResult = (results) => {
    repoListElement.repos = results;
  };

  const fallbackResult = (message) => {
    repoListElement.renderError(message);
  };

  searchElement.clickEvent = onButtonSearchClicked;
};

export default main;
