const millisecondsPerDay = 1000 * 60 * 60 * 24
//                         ms   sec   min  hrs
const minutesTil10pm = ((1000 * 60 * 60 * 22)/60)/60

var callback = function () {
    //document.getElementById("status").innerHTML = "History Cleared for the day"
    console.log("History cleared")
};

// Clears History for the past 24 hrs
function clearHistory(){
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

// Note: Months and Day of the week are counted from zero
function createAlarm() {
  chrome.alarms.create('10pmAlarm', {
    // when: 1502892000, // Timestamp in miliseconds pointing to 10pm 8/16/2017
    delayInMinutes: minutesTil10pm,
    periodInMinutes: 1440 // Will keep firing every day at 10pm
  });
}

// Listen
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '10pmAlarm') {
    console.log("Alarm Is Ringing");
      // Whatever you want
      clearHistory()
      chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.onMessage.addListener(function(msg) {
             console.log("message recieved" + msg);
             port.postMessage("Alarm Is Ringing");
        });
    })
  }
});
createAlarm();

// Connects to popup.js
