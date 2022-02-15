
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'set.repeat') {
		logj(request)
		try {
			playlist.repeat = request.repeat
			playlist.Save()
		} catch (e) {}
	}
})

