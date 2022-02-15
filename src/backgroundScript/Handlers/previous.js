
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'previous') {
		logj(request)
		playlist.Previous(SendUrl)
		return true
	}
})
