const app = document.getElementById('root');
let page = 1;

window.onscroll = function () {
    let d = document.documentElement;
    let offset = d.scrollTop + window.innerHeight;
    let height = d.offsetHeight;

    if (offset.toFixed(0) == height) {
        loadMore();
    }
};

function loadMore() {
    page++;
    if (totalResults - (page * 10) > -10) {
        let request = new XMLHttpRequest();
        request.open('GET', 'http://www.omdbapi.com/?s=' + params + '&page=' + page + '&apikey=7fc992bb', true);
        request.onload = function () {

            let data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400 && data.Response != "False") {
                const container = app.firstChild;
                data.Search.forEach(movie => {
                    const card = document.createElement('div');
                    card.setAttribute('class', 'card');

                    const title = document.createElement('h1');
                    if (movie.Title != '') {
                        title.textContent = movie.Title;
                    } else {
                        title.textContent = 'Brak danych';
                    }
                    title.setAttribute('class', 'title');

                    const year = document.createElement('p');
                    if (movie.Year != '') {
                        year.textContent = movie.Year;
                    } else {
                        year.textContent = 'Brak danych';
                    }
                    year.setAttribute('class', 'year');

                    const poster = document.createElement('img');
                    if (movie.Poster == 'N/A') {
                        poster.setAttribute('src', 'not.png');
                    } else {
                        poster.setAttribute('src', movie.Poster);
                    }
                    poster.setAttribute('alt', 'poster');

                    container.appendChild(card);
                    card.appendChild(title);
                    card.appendChild(poster);
                    card.appendChild(year);

                });
            }
        }
        request.send();
    } else {
        const oldError = document.getElementsByTagName('marquee');
        console.log(oldError);
        if (oldError.length <= 0) {
            const errorMessage = document.createElement('marquee');

            errorMessage.textContent = `Nie ma wiecej wynikow!`;
            app.appendChild(errorMessage);
        }
    }
}
