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
            await init(val).then((res) => {
                val += res.count;
                last = res.lastItemIndex === null ? -1 : res.lastItemIndex;
                res.results.forEach(el => {
                    allQuotes.push(el)
                })
            })
        }

    }
    return allQuotes;
}

export {
    getAll,
}