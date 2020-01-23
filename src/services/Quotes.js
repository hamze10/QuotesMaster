import { Quote } from '../models/Quote';

var allQuotes = [];
var val = 0;
var last = 0;

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

export {
    getAll,
    getRandom,
}