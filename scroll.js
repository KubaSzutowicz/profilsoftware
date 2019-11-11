const app = document.getElementById('root');
let page = 1;

window.onscroll = function() {
    if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
        loadMore();
    }
};

function loadMore() {
    page++;
    if (totalResults - (page * 10) > -10) {

        fetch('http://www.omdbapi.com/?s=' + params + '&page=' + page + '&apikey=7fc992bb')
        .then(resp => resp.json())
        .then(resp => {
          if (resp.Response != "False") {
           const container = document.getElementsByClassName('container')[0];
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
          } 
        })
        .catch(reason => {
          console.log(reason);
        });
    }
         else {
        const oldError = document.getElementsByTagName('marquee');
        console.log(oldError);
        if (oldError.length <= 0) {
            const errorMessage = document.createElement('marquee');

            errorMessage.textContent = `Nie ma wiecej wynikow!`;
            app.appendChild(errorMessage);
        }
    }
}
