
//MSG: {cmd: 'get.file', file: 'file'} //
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.random') {
		logj(request)
		try {
			cb(playlist.random)
		} catch (e) {}
		return true
	}
})

