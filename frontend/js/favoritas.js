window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  const data = JSON.parse(localStorage.getItem("favorita"));

  renderMovies(data);

  function renderMovies(movies) {
      if (movies.length < 1) {
          showNoFavoritesMessage();
      } else {
          movies.forEach((movie) => {
              const card = createMovieCard(movie);
              container.appendChild(card);
          });
      }
  }

  function showNoFavoritesMessage() {
      const h1 = document.createElement("h1");
      h1.innerText = "No hay peliculas favoritas";
      app.appendChild(h1);
  }

  function createMovieCard(movie) {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(duracion);

      return card;
  }
};
