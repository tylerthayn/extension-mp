//	chrome.tabs.query({active:true,currentWindow:true},function(tabs){var currTab=tabs[0];currTab&&(tab=currTab)});

let log = console.log, logj = function () {[...arguments].forEach(arg => {console.log(JSON.stringify(arg, null, 4))})}

window.playlist = new Playlist()

window.GetStorage = function () {
	chrome.storage.sync.get(null, function (storage) {
		logj(storage)
	})
}



