window.onload = async () => {
    const app = document.getElementById("root");
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    app.appendChild(container);
  
    try {
      const response = await fetch('http://localhost:3031/api/movies');
      const result = await response.json();
  
      let data = result.data;
  
      if (!localStorage.getItem("favorita")) {
        let favoritas = []
        localStorage.setItem("favorita", JSON.stringify(favoritas))
      }
  
      let a = document.querySelector("#favMovie")
      a.style.display = "block";
  
      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
  
        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
  
        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;
  
        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;
  
        const star = document.createElement("i");
        star.classList.add("fas", "fa-star", "star-icons");
        star.setAttribute("id", movie.id);
  
        let favoritas = JSON.parse(localStorage.getItem("favorita"));
  
        if (favoritas.find(favorita => favorita.id === movie.id)) {
          star.classList.add("favorita");
        }
  
        star.addEventListener("click", (e) => {
          e.preventDefault();
          let favorita = JSON.parse(localStorage.getItem("favorita"));
  
          if (!favorita.find(element => element.id === +e.target.id)) {
            favorita.push(movie);
            star.classList.add("favorita");
          } else {
            favorita = favorita.filter(element => element.id !== +e.target.id);
            star.classList.remove("favorita");
          }
      
          let a = document.querySelector("#favMovie")
          a.style.display = "block";
  
          localStorage.setItem("favorita", JSON.stringify(favorita))
          console.log(favorita)
        });
  
        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(star);
        card.appendChild(p);
  
        card.appendChild(duracion);
  
        const link = document.createElement("a");
        link.setAttribute('href', `formulario.html?movie=${movie.id}`);
        
        const editIcon = document.createElement("i");
        editIcon.classList.add("fas", "fa-edit");
        
        link.appendChild(editIcon);
        
        link.appendChild(document.createTextNode(""));
        
        card.appendChild(link);
      });
  
    } catch (error) {
      console.log(error)
    }
  };