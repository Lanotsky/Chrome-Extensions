const minutesTil10pm = 1320
const millisecondsPerDay = 1000 * 60 * 60 * 24
var hour = 22
var alarmTime = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), hour)

var callback = function () {

}

function clearHistory(){
  var last24hrs = (new Date()).getTime() - millisecondsPerDay
  chrome.browsingData.remove({
    "since": last24hrs
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
    when: alarmTime.getTime() ,
    periodInMinutes:  1440 // Will keep firing every day every 1440 minutes
})

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '10pmAlarm') {
    console.log("Alarm Is Ringing")
      clearHistory()
  }
})

var onClickAction = function(){
  console.log("Action taken")
}
// establish long lived connection
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "ui")
  port.onMessage.addListener(function(msg) {
    console.log("message received sucessully")
    console.log("message received: " + msg.order)
   port.postMessage({response: "connection established"})

  })

})