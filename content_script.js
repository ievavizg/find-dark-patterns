// const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, div');

// const text = document.querySelectorAll('body');

let found = false;

const url = chrome.runtime.getURL('./data.json');

let tabUrl = '';

fetch(url)
    .then((response) => response.json())
    .then((json) => {
        for (const [key, value] of Object.entries(json.patterns)) {
            // console.log(`${key}: ${value.name}`);
          }
    });

chrome.runtime.onMessage.addListener(function (response, sendResponse) {
    console.log(response);
    console.log('gjesgfjk');
        if(response) {
            // // MAYBE CHECK LOCAL STORAGE HERE AS WELL ?
            chrome.storage.local.get('url', function(data){
                if(tabUrl != data) {
                    console.log(tabUrl);
                    console.log(data);
                    console.log('how??')
                    tabUrl = data;
                } else {
                    console.log('rlyy??')
                }

                // console.log(tabUrl)
                // console.log(url)
            });

            setIconText(false);
            console.log('here');
        }
});

window.onload=function(){
    const text = document.body.innerText;

    console.log('yyy')
    
    if(text.includes('Per savaitę prekė peržiūrėta')) {
        console.log('whyy')
        setIconText(true);
    }
}


// for(let i=0; i< text.length; i++) {
//     console.log('222');
//     if(text[i].innerHTML.includes('Per savaitę prekė peržiūrėta')) {
//         text[i].innerHTML = text[i].innerHTML.replace('Per savaitę prekė peržiūrėta', 'WOOHOO');
//         setIconText(true);
//     }
//     if (text[i].innerHTML.includes('šiuo metu domisi')) {
//         text[i].innerHTML = text[i].innerHTML.replace('šiuo metu domisi', 'HERE');
//         setIconText(true);
//     }
//     if (text[i].innerHTML.includes('Paskutinį kartą užsakyta prieš')) {
//         text[i].innerHTML = text[i].innerHTML.replace('Paskutinį kartą užsakyta prieš', 'NOO');
//         setIconText(true);
//     }
//     //Paskutinį kartą užsakyta prieš
// }

  function setIconText (value) {
        chrome.runtime.sendMessage({
            action: 'updateIcon',
            value: value
        });
    }

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//     console.log('111');
//     if (msg.action === "urlUpdated") {
//         console.log('222');
//         // if (msg.value == true) {
//         //   chrome.action.setBadgeText({text: '!'});
//         // }
//         //  else {
//         //   chrome.browserAction.setIcon({path: "/images/red_circle_16.png"});
//         // }
//     }
//   });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     alert('updated from contentscript');
//   });

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log('came?');
//       // listen for messages sent from background.js
//       if (request.message === 'hello!') {
//         console.log(request.url) // new url is now in content scripts!
//       }
//   });