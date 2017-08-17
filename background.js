const minutesTil10pm = 1320
const millisecondsPerDay = 1000 * 60 * 60 * 24
//                         ms   sec   min  hrs
var callback = function () {
    //document.getElementById("status").innerHTML = "History Cleared for the day"
    console.log("History cleared")
}

// Clears History for the past 24 hrs
function clearHistory(){
  var timeFrame = (new Date()).getTime() - millisecondsPerDay
  chrome.browsingData.remove({
    "since": timeFrame
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
  }, callback)

}

chrome.alarms.create('10pmAlarm', {
    delayInMinutes: 10,
    periodInMinutes: 1440 // Will keep firing every day at 10pm
})

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '10pmAlarm') {
    console.log("Alarm Is Ringing")
      clearHistory()
  }
})

// Listen
// One way communication
/*
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '10pmAlarm') {
    console.log("Alarm Is Ringing")
      // Whatever you want
      clearHistory()
      chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....")
        port.onMessage.addListener(function(msg) {
             console.log("message recieved" + msg)
             port.postMessage("Alarm Is Ringing")
        })
    })
  }
})
*/

var onClickAction = function(){
  console.log("Action taken")
}


chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "ui")
  port.onMessage.addListener(function(msg) {
    console.log("from popup -> " + msg.order)
   port.postMessage({response: "connection established"})

  })

})