
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'delete') {
		logj(request)
		try {
			chrome.tabs.query({active:true,currentWindow:true}, function (tabs) {
				chrome.bookmarks.search({url: tabs[0].url}, results => {
					chrome.bookmarks.remove(results[0].id)
				})
			})
		} catch (e) {}
		return true
	}
})

