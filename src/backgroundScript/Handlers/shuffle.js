
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'shuffle') {
		logj(request)
		try {
			playlist.Shuffle()
		} catch (e) {}
		return true
	}
})

