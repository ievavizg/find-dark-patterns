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
      }
      //  else {
      //   chrome.browserAction.setIcon({path: "/images/red_circle_16.png"});
      // }
  }
});
