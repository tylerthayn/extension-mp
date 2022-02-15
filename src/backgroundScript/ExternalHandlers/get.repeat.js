
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.repeat') {
		logj(request)
		try {
			chrome.storage.sync.get('repeat', function (storage) {
				cb(storage.repeat || false)
			})
		} catch (e) {}
		return true
	}
})

