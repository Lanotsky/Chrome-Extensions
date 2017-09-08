var port = chrome.runtime.connect({name: "ui"})

chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var activeTab = arrayOfTabs[0]
    var activeTabId = activeTab.id
    console.log(activeTab.url)
})


function clearNow(){
  // establish long lived connection
  port.postMessage({order: "clear now"})
  port.onMessage.addListener(function(msg) {
    console.log("message sent sucessfully")
    console.log("reply to sent: "+ msg.response)
    
  })
}

// Clears on command

$(document).ready(function(){
  $("#clearNow").click(function(){
    clearNow()
  })
})


// Closes popup

$(document).ready(function(){
  $("#gotIt").click(function(){
    window.close()
  })
})