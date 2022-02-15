
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'stop') {
		logj(request)
		try {
			chrome.storage.sync.set({running: false})
		} catch (e) {}
	}
})

