chrome.browserAction.onClicked.addListener(function(tab) {
	console.log("browser clicked");
})

// Clock and stopwatch here

// gets the url of the active tab
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
});

// -- test time
var sec = 0
var minutes = 0;
var hours = 0;
function printStopWatch(seconds){
	if(seconds>=60){
		sec = 0;
		minutes++;
	}if(minutes>=60){
		minutes = 0;
		hours++
	}

	console.log(hours+":"+minutes+":"+sec)
}



// Adjusted clock

var interval = 1000; // ms
var expected = Date.now() + interval;
// setTimeout(step, interval);
function step() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)
    if (dt > interval) {
        // something really bad happened. Maybe the browser (tab) was inactive?
        // possibly special handling to avoid futile "catch up" run
    }
	 // do what is to be done
	expected += interval;
	printStopWatch(sec++)
	setTimeout(step, Math.max(0, interval - dt)); // take into account drift

}

// step()

console.log("confirm bacground.js")