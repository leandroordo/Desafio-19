function loadProducts() {
  const isResponseOk = (response) => {
    if (!response.ok) throw new Error(response.status);
    return response.text();
  };

  fetch("https://leandroordonez.azurewebsites.net/movies", {
    method: "GET",
    mode: "cors",
    headers: new Headers({ "Content-type": "application/json" }),
  })
    .then((response) => isResponseOk(response))
    .then((data) => {
      movies = JSON.parse(data);
      filteredMovies = movies;
      showMovies();
      loadYearsList();
    })
    .catch((err) => {
      //Mostrar error
      showError();
      console.error("ERROR: ", err.message);
    });
}

document.addEventListener("DOMContentLoaded", () => loadProducts());
