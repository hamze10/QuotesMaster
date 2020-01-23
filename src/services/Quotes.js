import AsyncStorage from '@react-native-community/async-storage';
import { Quote } from '../models/Quote';

var allQuotes = [];
var val = 0;
var last = 0;

async function init(value) {
    const resp = await fetch("https://api.quotable.io/quotes?skip=" + value);
    return resp.json();
}

async function getAll() {
    let stor = null;
    try{
        stor = await AsyncStorage.getItem('MyQuotes');
    }catch(e){}

    console.log("Stor : ", stor);

    if (allQuotes.length === 0 && stor === null) {
        while (last >= 0) {
            await init(val).then(async (res) => {
                val += res.count;
                last = res.lastItemIndex === null ? -1 : res.lastItemIndex;
                await res.results.forEach(el => {
                    allQuotes.push(new Quote(el._id, el.content, el.author))
                })
            })
        }
        try{
            AsyncStorage.setItem('MyQuotes', allQuotes);
        }catch(e){}
    }
    if (allQuotes.length === 0 && stor !== null){
        allQuotes = stor;
    }
    return allQuotes;
}

function getRandom(){
    let index = allQuotes.length;
    return allQuotes[Math.floor(Math.random()*index)];
}

export {
    getAll,
    getRandom,
}