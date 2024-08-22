const proxyUrl = 'https://api.allorigins.win/get?url=';

// Function to fetch and display Eenadu news
const fetchEenaduNews = async () => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = "<h3>EENADU NEWS</h3>";
    const url = `${proxyUrl}${encodeURIComponent("https://www.eenadu.net/latest-news")}`;
    const response = await fetch(url);
    const data = await response.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    const news = doc.querySelectorAll('aside.thumb-content-more');
    for (let elem of news) {
        const headline = elem.querySelector('h3').innerText;
        const link = elem.querySelector('a').getAttribute('href');
        newsContainer.innerHTML += `<h3>${headline}</h3>`;
        const linkResponse = await fetch(`${proxyUrl}${encodeURIComponent(link)}`);
        const linkData = await linkResponse.json();
        const linkDoc = parser.parseFromString(linkData.contents, 'text/html');
        const paras = linkDoc.querySelectorAll('div.text-justify');

        paras.forEach((para) => {
            newsContainer.innerHTML += `<p>${para.innerText}</p>`;
        });
        newsContainer.innerHTML += "<br><br>";
    }
};

// Function to fetch and display Andhrajyothi news
const fetchAndhrajyothiNews = async () => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = "<h3>ANDHRAJYOTHI NEWS</h3>";
    const url = `${proxyUrl}${encodeURIComponent("https://www.andhrajyothy.com/latest-news")}`;
    const response = await fetch(url);
    const data = await response.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    const headlines = doc.querySelectorAll('h3');

    for (let elem of headlines) {
        const headlineText = elem.innerText;
        const newsLink = "https://www.andhrajyothy.com" + elem.querySelector('a').getAttribute('href');
        newsContainer.innerHTML += `<h3>${headlineText}</h3>`;
        const newsResponse = await fetch(`${proxyUrl}${encodeURIComponent(newsLink)}`);
        const newsData = await newsResponse.json();
        const newsDoc = parser.parseFromString(newsData.contents, 'text/html');
        const content = newsDoc.querySelectorAll('div.category_desc p');

        content.forEach((para) => {
            newsContainer.innerHTML += `<p>${para.innerText}</p>`;
        });
        newsContainer.innerHTML += "<br><br>";
    }
};

// Function to fetch and display Vartha news
const fetchVarthaNews = async () => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = "<h3>VARTHA NEWS</h3>";
    const url = `${proxyUrl}${encodeURIComponent('https://www.vaartha.com/category/latest-news/')}`;
    const response = await fetch(url);
    const data = await response.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    const anchors = doc.querySelectorAll('a.more-link');

    for (let elem of anchors) {
        const title = elem.getAttribute('title');
        const link = elem.getAttribute('href');
        newsContainer.innerHTML += `<h3>${title}</h3>`;
        const linkResponse = await fetch(`${proxyUrl}${encodeURIComponent(link)}`);
        const linkData = await linkResponse.json();
        const linkDoc = parser.parseFromString(linkData.contents, 'text/html');
        const paras = linkDoc.querySelectorAll('p');

        paras.forEach((para) => {
            newsContainer.innerHTML += `<p>${para.innerText}</p>`;
        });
        newsContainer.innerHTML += "<br><br>";
    }
};
// Function to handle user choice and fetch respective news
const fetchNews = async (choice) => {
    switch (choice) {
        case 'eenadu':
            await fetchEenaduNews();
            break;
        case 'andhrajyothi':
            await fetchAndhrajyothiNews();
            break;
        case 'vartha':
            await fetchVarthaNews();
            break;
        default:
            alert("Enter valid name");
    }
};
