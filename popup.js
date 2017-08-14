var callback = function () {
    document.getElementById("#status").innerHTML = "History Cleared for the day"
  };
  
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