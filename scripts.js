let totalResults;
let params;
let sortBy;

function search(event) {
    event.preventDefault();
    sortBy = '';
    let title = document.getElementById('nameMovie').value;
    let year = document.getElementById('yearMovie').value;
    params = title;
    if (year != '') {
        params += '&y=' + year;
    }

    let request = new XMLHttpRequest();
    request.open('GET', 'http://www.omdbapi.com/?s=' + params + '&apikey=7fc992bb', true);
    request.onload = function () {

        // Begin accessing JSON data here
        let data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400 && data.Response != "False") {
            while (app.firstChild) {
                app.removeChild(app.firstChild);
            }
            const container = document.createElement('div');
            container.setAttribute('class', 'container');
            app.appendChild(container);
            totalResults = data.totalResults;

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
        } else {
            const oldError = document.getElementsByTagName('marquee');
            if (oldError.length <= 0) {
                const errorMessage = document.createElement('marquee');

                errorMessage.textContent = `Nie ma takiego filmu w bazie!`;
                app.insertBefore(errorMessage, app.firstChild);
            }
        }
    }

    request.send();
}

function startSorting(event) {
    event.preventDefault();
    sortBy = document.getElementById('sortOption').value;
    sortMovies();
}

function sortMovies() {
    let container = document.getElementsByClassName('container');
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
