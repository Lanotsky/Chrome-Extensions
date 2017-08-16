chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var activeTab = arrayOfTabs[0];
    var activeTabId = activeTab.id;
    console.log(activeTab.url);
});

var callback = function () {
    document.getElementById("status").innerHTML = "History Cleared for the day"
};

function clearHistory(){
  var millisecondsPerDay = 1000 * 60 * 60 * 24;
  var oneDayAgo = (new Date()).getTime() - millisecondsPerDay;
  chrome.browsingData.remove({
    "since": oneDayAgo
  }, {
    "appcache": true,
    "cache": true,
    "cookies": true,
    "downloads": true,
    "fileSystems": true,
    "formData": true,
    "history": true,
    "indexedDB": true,
    "localStorage": true,
    "pluginData": true,
    "passwords": true,
    "webSQL": true
  }, callback);

}

var callback = function (message, sender, sendResponse) {
  if(message=="Alarm Is Ringing"){
    sendResponse();
  }
}

chrome.runtime.onMessage.addListener(callback(msg, sender, function(){
  console.log("response sent form popup.js")
  clearHistory()
}))


