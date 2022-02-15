
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.repeat') {
		logj(request)
		try {
			cb(playlist.repeat)
		} catch (e) {}
		return true
	}
})

