var port = chrome.runtime.connect({name: "ui"});

chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var activeTab = arrayOfTabs[0]
    var activeTabId = activeTab.id
    console.log(activeTab.url)
})


port.postMessage({order: "establish connection"});
port.onMessage.addListener(function(msg) {
  console.log("from background -> " + msg.response)
  
});

// a way to change the initial alarm hour

var hours = function(hourOftheDay){
  // limit timeframe within the day
  return (hourOftheDay >= 24) ? 23 : hourOftheDay
  
}

var x = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), 0)
console.log(x.getTime() + " - get adjusted time ")
var Date = new Date()
console.log(Date.getFullYear()+ "--getFullYear")
console.log(Date.getMonth()+ "--getMonths")
console.log(Date.getDate()+ "--getDate")
console.log(Date.getHours()+ "--getHours")


