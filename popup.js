const port = chrome.runtime.connect({name: "ui"})

chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    const activeTab = arrayOfTabs[0]
    const activeTabId = activeTab.id
    console.log(activeTab.url)
})


const clearNow= ()=>{
  // establish long lived connection
  port.postMessage({order: "clear now"})
  port.onMessage.addListener((msg)=>{
    console.log("message sent sucessfully")
    console.log("reply to sent: "+ msg.response)
    
  })
}


$(document).ready(()=>{
  $("#clearNow").click(()=>{
    clearNow()
    window.close();
  })
  $("#gotIt").click(()=>{
    window.close()
  })
})