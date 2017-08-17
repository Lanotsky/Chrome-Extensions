chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var activeTab = arrayOfTabs[0];
    var activeTabId = activeTab.id;
    console.log(activeTab.url);
});




var port = chrome.extension.connect({
  name: "Sample Communication"
});

// Connects to background.js
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
  if(msg == "Alarm Is Ringing"){
    console.log("Msg from background recieved -->"+msg)
    
  }
  
});