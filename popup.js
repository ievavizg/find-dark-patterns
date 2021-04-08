// // Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }


// Initialize button with user's preferred color
// let patternsButton = document.getElementById("patternsButton");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// document.getElementById("patternsButton").addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   console.log('haya')
//   // chrome.scripting.executeScript({
//   //   target: { tabId: tab.id },
//   //   function: checkForDarkPatterns,
//   // });
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

document.addEventListener('DOMContentLoaded', function () {
    var patternsButton = document.getElementById("patternsButton");
    chrome.storage.local.set({'patternsNumb':undefined}, function () {});
    chrome.storage.local.set({'types':undefined}, function () {});
    document.getElementById('patternsFound').value = null;
    patternsButton.addEventListener('click', async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const url = chrome.runtime.getURL('./data.json');

        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            let patternsWereFound = 0;
            const text = document.body.innerText;
            var types = [];
              for (const [key, value] of Object.entries(json.patterns)) {
                //  console.log(`${key}: ${value.name}`);
                if(text.match(value.regex)) {
                  types.push(value.type);
                  patternsWereFound++;
                }
            }
        chrome.storage.local.set({'patternsNumb':patternsWereFound}, function () {});
        chrome.storage.local.set({'patternsTypes':JSON.stringify(types)}, function () {});
        });

      },
      });
      setTimeout(function(){
        chrome.storage.local.get('patternsNumb', function (data) {
          if(data.patternsNumb) {
            document.getElementById('patternsFound').value = data.patternsNumb;
          }
        });
        chrome.storage.local.get('patternsTypes', function (data) {
          if(data.patternsTypes) {
            const returnedTypesToString = String(data.patternsTypes);
            const valuesWithoutQuates = returnedTypesToString.slice(1, returnedTypesToString.length-1);
            const values = valuesWithoutQuates.replace(/,/g,'\n').replace(/"/g,'');
            document.getElementById('patternsFoundTypes').value = values;
          }
        });
      },200)
    }, false);
});


function setIconText (value) {
  chrome.runtime.sendMessage({
      action: 'updateIcon',
      value: value
  });
}