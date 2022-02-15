
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'set.random') {
		logj(request)
		try {
			playlist.random = request.random
			playlist.Save()
		} catch (e) {}
	}
})

