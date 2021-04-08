let color = '#3aa757';

// console.log(data);

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  // console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "updateIcon") {
      if (msg.value == true) {
        chrome.action.setBadgeText({text: '!'});
      } else {
        chrome.action.setBadgeText({text: ''});
      }
  }
});

// chrome.storage.onChanged.addListener(function(changes, namespace) {
  // console.log('aaaaa')
  // console.log(changes);
  // if ("active" in changes) {

      // console.log("Old value: " + changes.active.oldValue);
      // console.log("New value: " + changes.active.newValue);
  // }
// });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
    // localStorage["inputText"] = tab.url; 
    chrome.storage.local.get('url', function(data){
      if(data.url !== tab.url) {
        chrome.storage.local.set({'url':tab.url});
        chrome.tabs.sendMessage(tabId,true); 
      }
        });

      // chrome.local.storage.get('URLs', function(URL's) {
      //     // Iterate through this list here and match with tab.url, if the match is found, just return.
      //     if (url is there in list) {return;}
      //     else {
      //         alert("tab load complete");
      //         chrome.local.set({URLs: [tab.url]}); 
      //     }
      // });
  }
});

// console.log(localStorage);
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   chrome.tabs.sendMessage(tabId,true); 
// });

//SOMETHING HERE
// chrome.tabs.onCreated.addListener(function(tab) {         
//  insertDictionaryScript();
// });

// chrome.tabs.onUpdated.addListener(
//   function(tabId, changeInfo, tab) {
//     // read changeInfo data and do something with it
//     // like send the new url to contentscripts.js
//     console.log('2222');
//     if (changeInfo.url) {
//       console.log('1111');
//       chrome.tabs.sendMessage( tabId, {
//         message: 'hello!',
//         url: changeInfo.url
//       })
//     }
//   }
// );