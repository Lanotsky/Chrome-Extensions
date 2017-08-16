// Note: Months and Day of the week are counted from zero
function createAlarm() {
  chrome.alarms.create('10pmAlarm', {
    when: 1502892000, // Timestamp in miliseconds pointing to 10pm 8/16/2017
    periodInMinutes: 1440 // Will keep firing every day at 10pm
  });
}

// Listen
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '10pmAlarm') {
    console.log("Alarm Is Ringing");
      // Whatever you want
      // Make a call to popup.js
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
