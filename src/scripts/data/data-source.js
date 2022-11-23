class DataSource {
  static searchRepo(keyword) {
    return fetch(`https://api.github.com/search/repositories?q=${keyword}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.items) {
          return Promise.resolve(responseJson.items);
        } else {
          return Promise.reject(`${keyword} is not found`);
        }
      });
  }
}

export default DataSource;
