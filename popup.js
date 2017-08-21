var port = chrome.runtime.connect({name: "ui"})

chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var activeTab = arrayOfTabs[0]
    var activeTabId = activeTab.id
    console.log(activeTab.url)
})

// establish long lived connection
port.postMessage({order: "establish connection"})
port.onMessage.addListener(function(msg) {
  console.log("message sent sucessfully")
  console.log("reply to sent: "+ msg.response)
  
})

$(document).ready(function(){
  $("#gotIt").click(function(){
    window.close()
  })
})