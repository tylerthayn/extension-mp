
//MSG: {cmd: 'get.file', file: 'file'} //
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.random') {
		logj(request)
		try {
			chrome.storage.sync.get('random', function (storage) {
				cb(storage.random || false)
			})
		} catch (e) {}
		return true
	}
})

