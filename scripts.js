let totalResults;
let params;
let sortBy;

function search(event) {
  event.preventDefault();
  sortBy = "";
  let title = document.getElementById("nameMovie").value;
  let year = document.getElementById("yearMovie").value;
  params = title;
  if (year != "") {
    params += "&y=" + year;
  }

  fetch("http://www.omdbapi.com/?s=" + params + "&apikey=7fc992bb")
    .then(resp => resp.json())
    .then(resp => {
      if (resp.Response != "False") {
        while (app.firstChild) {
          app.removeChild(app.firstChild);
        }
        const container = document.createElement("div");
        container.setAttribute("class", "container");
        app.appendChild(container);
        totalResults = resp.totalResults;
        resp.Search.forEach(movie => {
          fetch(
            "http://www.omdbapi.com/?i=" + movie.imdbID + "&apikey=7fc992bb"
          )
            .then(resp => resp.json())
            .then(resp => {
              const card = document.createElement("div");
              card.setAttribute("class", "card");

              const title = document.createElement("h1");
              if (resp.Title != "N/A") {
                resp.Title = resp.Title.substring(0, 20);
                title.textContent = resp.Title;
              } else {
                title.textContent = "Brak danych";
              }
              title.setAttribute("class", "title");

              const year = document.createElement("p");
              if (resp.Released != "N/A") {
                year.textContent = resp.Released;
              } else {
                year.textContent = "Brak danych";
              }
              year.setAttribute("class", "year");

              const poster = document.createElement("img");
              if (resp.Poster == "N/A") {
                poster.setAttribute("src", "not.png");
              } else {
                poster.setAttribute("src", resp.Poster);
              }
              poster.setAttribute("alt", "poster");

              
              const rating = document.createElement("p");
              if (resp.imdbRating != "N/A") {
                                   rating.textContent = resp.imdbRating;

              } else {
                  rating.textContent = "Brak oceny";
              }
              
              
              
              
              
              const awards = document.createElement("p");
              if (resp.Awards != "N/A") {
                                   awards.textContent = resp.Awards;

              } else {
                  awards.textContent = "Brak nagrod";
              }




              const plot = document.createElement("p");
              if (resp.Plot != "N/A") {
                  

                  resp.Plot = resp.Plot.substring(0, 100);
                  plot.textContent = resp.Plot;

              } else {
                  plot.textContent = "Brak opisu";
              }





              container.appendChild(card);
              card.appendChild(title);
              card.appendChild(poster);

              card.appendChild(rating);
              card.appendChild(year);
              card.appendChild(awards);
              card.appendChild(plot);

            });
        });
      } else {
        const oldError = document.getElementsByTagName("marquee");
        if (oldError.length <= 0) {
          const errorMessage = document.createElement("marquee");

          errorMessage.textContent = `Nie ma takiego filmu w bazie!`;
          app.insertBefore(errorMessage, app.firstChild);
        }
      }
    })
    .catch(reason => {
      console.log(reason);
    });
}

function startSorting(event) {
  event.preventDefault();
  sortBy = document.getElementById("sortOption").value;
  sortMovies();
}

function sortMovies() {
  let container = document.getElementsByClassName("container");
  if (container.length > 0) {
    container = container[0];
    let elems = container.childNodes;

    let array = [];
    for (let i = 0; i < elems.length; i++) {
      array[i] = elems[i];
    }

    array.sort(function sort(ea, eb) {
      let a = ea.getElementsByClassName(sortBy)[0].innerHTML.trim();
      let b = eb.getElementsByClassName(sortBy)[0].innerHTML.trim();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    let output = "";
    for (let i = 0; i < array.length; i++) {
      output += array[i].outerHTML;
    }

    container.innerHTML = output;
  }
}
