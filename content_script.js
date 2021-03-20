const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, div');

let found = false;

const url = chrome.runtime.getURL('./data.json');

fetch(url)
    .then((response) => response.json())
    .then((json) => {
        for (const [key, value] of Object.entries(json.patterns)) {
            console.log(`${key}: ${value.name}`);
          }
    });


    for(let i=0; i< text.length; i++) {
        if(text[i].innerHTML.includes('Per savaitę prekė peržiūrėta')) {
            text[i].innerHTML = text[i].innerHTML.replace('Per savaitę prekė peržiūrėta', 'WOOHOO');
            found = true;
        }
        if (text[i].innerHTML.includes('šiuo metu domisi')) {
            text[i].innerHTML = text[i].innerHTML.replace('šiuo metu domisi', 'HERE');
            found = true;
        }
        if (text[i].innerHTML.includes('Paskutinį kartą užsakyta prieš')) {
            text[i].innerHTML = text[i].innerHTML.replace('Paskutinį kartą užsakyta prieš', 'NOO');
            found = true;
        }
        //Paskutinį kartą užsakyta prieš
    }

chrome.runtime.sendMessage({
    action: 'updateIcon',
    value: found
});