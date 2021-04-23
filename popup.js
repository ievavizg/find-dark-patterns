var query = { active: true, currentWindow: true };

document.addEventListener("DOMContentLoaded", function () {
  var patternsButton = document.getElementById("patternsButton");
  chrome.storage.local.set({ patternsNumb: undefined }, function () {});
  chrome.storage.local.set({ types: undefined }, function () {});
  document.getElementById("patternsFound").value = null;
  patternsButton.addEventListener(
    "click",
    async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          const url = chrome.runtime.getURL("./data.json");

          fetch(url)
            .then((response) => response.json())
            .then((json) => {
              let patternsWereFound = 0;
              const text = document.body.innerText;
              var types = [];
              for (const [key, value] of Object.entries(json.patterns)) {
                if (text.match(value.regex)) {
                  types.push(value.type);
                  patternsWereFound++;
                }
              }

              const timers = document.querySelectorAll(".time", ".countdown");
              if (timers.length > 0) {
                types.push("TIMER");
                patternsWereFound++;
              }

              const infoBadges = document.querySelectorAll(".info-badge");
              for (let i = 0; i < infoBadges.length; i++) {
                types.push("POPUP");
                patternsWereFound++;
              }

              chrome.storage.local.set(
                { patternsNumb: patternsWereFound },
                function () {}
              );
              chrome.storage.local.set(
                { patternsTypes: JSON.stringify(types) },
                function () {}
              );
            });
        },
      });
      setTimeout(function () {
        chrome.storage.local.get("patternsNumb", function (data) {
          if (data.patternsNumb) {
            console.log(Number(data.patternsNumb));
            if (Number(data.patternsNumb) > 0) {
              document.getElementById("patternsFound").value =
                data.patternsNumb;
            }
          } else {
            // document.getElementById("content").innerHTML =
            //   '<div class="darkitem"><div class="good"><div class="message"><span>Great news!</span>No any known dark patterns found on this page.</div></div></div>';
            document.getElementById("content").innerHTML = '<div class="green"><span>Great news!</span><div>No any known dark patterns found on this page.</div></div></div>'
          }
        });
        chrome.storage.local.get("patternsTypes", function (data) {
          if (data.patternsTypes) {
            const returnedTypesToString = String(data.patternsTypes);
            const valuesWithoutQuates = returnedTypesToString.slice(
              1,
              returnedTypesToString.length - 1
            );
            const values = valuesWithoutQuates
              .replace(/,/g, "\n")
              .replace(/"/g, "");
            document.getElementById("patternsFoundTypes").value = values;
          }
        });
      }, 200);
    },
    false
  );
});

function setIconText(value) {
  chrome.runtime.sendMessage({
    action: "updateIcon",
    value: value,
  });
}


//Open up link from popup
document.addEventListener('DOMContentLoaded', function () {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
      (function () {
          var ln = links[i];
          var location = ln.href;
          ln.onclick = function () {
              chrome.tabs.create({active: true, url: location});
          };
      })();
  }
});
