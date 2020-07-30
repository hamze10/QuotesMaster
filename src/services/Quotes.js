import { Quote } from '../models/Quote';

var allQuotes = [];
var val = 0;
var last = 0;

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

async function init(value) {
    const resp = await fetch("https://api.quotable.io/quotes?skip=" + value);
    return resp.json();
}

async function getAll() {
    if (allQuotes.length === 0) {
        while (last >= 0) {
            await init(val).then(async (res) => {
                val += res.count;
                last = res.lastItemIndex === null ? -1 : res.lastItemIndex;
                await res.results.forEach(el => {
                    allQuotes.push(new Quote(el._id, el.content, el.author))
                })
            })
        }
    }

    return allQuotes;
}

function getRandom() {
    let index = allQuotes.length;
    return allQuotes[Math.floor(Math.random() * index)];
}

function getThreeRandomAuthor(exceptAuthor) {
    let authors = []
    let index = allQuotes.length;
    let i = 0;
    while (i < 3 ) {
        let autho = allQuotes[Math.floor(Math.random() * index)].author;
        while (authors.indexOf(autho) >=0 || autho === exceptAuthor){
            autho = allQuotes[Math.floor(Math.random() * index)].author;
        }
        authors.push(autho.trim())
        i = i + 1;
    }
    authors.push(exceptAuthor);
    shuffle(authors);
    return authors;
}

export {
    getAll,
    getRandom,
    getThreeRandomAuthor,
}