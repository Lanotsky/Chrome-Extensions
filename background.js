// const minutesTil10pm = 1320
const millisecondsPerDay = 1000 * 60 * 60 * 24
const minutesPerDay = 1440;
let Hour = 18; // variable
let Minutes = 0; // variable
let alarmTime = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), Hour, Minutes); // 1800 is 6pm
console.log(`alarm will fire at: ${alarmTime}`);
let callback = function () {
  let today = new Date();
  alert(`History cleard at ${today}`);
}

const clearHistory = ()=>{
  let last24hrs = (new Date()).getTime() - millisecondsPerDay
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
    // "pluginData": true,
    "passwords": true
    // "webSQL": true
  }, callback)

}


chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '10pmAlarm') {
    console.log("Alarm Is Ringing")
      clearHistory()
  }
})

const onClickAction = ()=>{
  console.log("Action taken")
}

chrome.runtime.onInstalled.addListener(()=>{
  chrome.alarms.create('10pmAlarm', {
    when: alarmTime.getTime(),
    periodInMinutes:  1440 // Will keep firing every day every 1440 minutes
  })

  chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === '10pmAlarm') {
      console.log("Alarm Is Ringing")
        clearHistory()
    }
  });

})

// establish long lived connection with the popup.js
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "ui")
  port.onMessage.addListener(function(msg) {
    console.log("message received sucessully")
    // console.log("message received: " + msg.order)
   if (msg.order === "clear now") { clearHistory() }
   port.postMessage({response: "connection established"})
  })
})