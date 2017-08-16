// Note: Months and Day of the week are counted from zero
function createAlarm() {
  var now = new Date();
  var day = now.getDate();
  if (now.getHours() >= 6) {
      // 6 AM already passed
      day += 1;
  }
  // Sets the alarm time
  // '+' casts the date to a number, like [object Date].getTime();
  var timestamp = +new Date(now.getFullYear(), now.getMonth(), day, 6, 0, 0, 0);
  //                        YYYY               MM              DD  HH MM SS MS

  // Create the alarm
  chrome.alarms.create('6AMyet', {
      when: timestamp
  });
}

// Listen
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '6AMyet') {
    console.log("Alarm Is Ringing");
      // Whatever you want
      // Make a call to popup.js
      chrome.runtime.sendMessage({message:"Alarm Is Ringing"})
  }
});
createAlarm();
