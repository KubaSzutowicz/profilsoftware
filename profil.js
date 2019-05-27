getData();

function getData() {
    var url = 'https://www.reddit.com/r/funny.json';
    var http = new XMLHttpRequest();
    var method = 'GET';
    http.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            console.log(this.status);
        }
        if (this.responseText) {
            var parsedResponse = getParsedRedditData(JSON.parse(this.responseText));
            sortPosts('created', parsedResponse.posts);
            console.log(parsedResponse.posts);
            sortPosts('num_comments', parsedResponse.posts);
            console.log(parsedResponse.posts);
            sortPosts('score', parsedResponse.posts);
            console.log(parsedResponse.posts);
            sortPosts('upvotes', parsedResponse.posts);
            console.log( parsedResponse.posts);
            console.log(getPostsFromLast24h(parsedResponse.posts));
        }
    }
    http.open(method, url, true);
    http.setRequestHeader('Content-type', 'jsonp');
    http.send();
}

function getParsedRedditData(response) {
    if (response) { 
        var posts = [];
        response.data.children.forEach(function (element) {
            var post = new Object();
            post.title = element.data.title;
            post.upvotes = element.data.ups;
            post.score = element.data.score;
            post.num_comments = element.data.num_comments;
            var date = new Date(element.data.created_utc * 1000);
            if (date.getDate() < 10) {
                post.created = '0' + date.getDate() + '.';
            } else {
                post.created = date.getDate() + '.';
            }
            if (date.getMonth() + 1 < 10) {
                post.created += '0' + (date.getMonth() + 1);
            } else {
                post.created += (date.getMonth() + 1);
            }
            post.created += '.' + date.getFullYear() + ' ';
            if (date.getHours() < 10) {
                post.created += '0' + date.getHours() + ':';
            } else {
                post.created += date.getHours() + ':';
            }
            if (date.getMinutes() < 10) {
                post.created += '0' + date.getMinutes();
            } else {
                post.created += date.getMinutes();
            }
            posts.push(post);
        });
        var parsedReddit = new Object();
        parsedReddit.posts = posts;
        parsedReddit.counts = response.data.dist;
        return parsedReddit;
    }
}

function changeFormat(date) { 
    var splitted = date.split('.');
    return (splitted[1] + '.' + splitted[0] + '.' + splitted[2]);
}

function sortPosts(sortType, posts) {
    switch (sortType) { 
        case 'upvotes':
            posts.sort(function (a, b) {
                return a.upvotes - b.upvotes;
            });
            break;
        case 'num_comments':
            posts.sort(function (a, b) {
                return a.num_comments - b.num_comments;
            });
            break;
        case 'score':
            posts.sort(function (a, b) {
                return a.score - b.score;
            });
            break;
        case 'created':
            posts.sort(function (a, b) {
                var firstDate = changeFormat(a.created);
                var secondDate = changeFormat(b.created);
                return new Date(Date.parse(firstDate)) - new Date(Date.parse(secondDate));
            });
            break;
        default:
            console.log('Invalid sort type');
    }
}

function getPostsFromLast24h(posts) {
    var yesterday = new Date(); 
    yesterday.setDate(yesterday.getDate() - 1); 
    return posts.filter(function (post) {
        return new Date(Date.parse(changeFormat(post.created))) > yesterday; 
    });
}