
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'set.repeat') {
		logj(request)
		try {
				chrome.storage.sync.set({repeat: request.repeat || false})
		} catch (e) {}
	}
})

