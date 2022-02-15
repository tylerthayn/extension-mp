
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.storage') {
		logj(request)
		try {
			chrome.storage.sync.get(null, function (storage) {
				cb(storage || false)
			})
		} catch (e) {cb(false)}
		return true
	}
})

