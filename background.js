function createAlarm() {
  var now = new Date();
  var day = now.getDate();
  if (now.getHours() >= 24) {
      // 12 AM already passed
      day += 1;
  }
  // '+' casts the date to a number, like [object Date].getTime();
  var timestamp = +new Date(now.getFullYear(), now.getMonth(), day, 3, 0, 0, 0);
  //                        YYYY               MM              DD  HH MM SS MS

  // Create
  chrome.alarms.create('12AMyet', {
      when: timestamp
  });
}

// Listen
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === '12AMyet') {
      // Whatever you want
  }
});
createAlarm();