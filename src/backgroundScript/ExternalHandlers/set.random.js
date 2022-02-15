
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'set.random') {
		logj(request)
		try {
				chrome.storage.sync.set({random: request.random || false})
		} catch (e) {}
	}
})

