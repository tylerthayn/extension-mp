
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.running') {
		logj(request)
		try {
			chrome.tabs.query({active:true}, function (tabs) {
				if (tabs[0].id && tabs[0].id == window.tab) {
					chrome.storage.sync.get('running', function (storage) {
						cb(storage.running || false)
					})
				} else {
					cb(false)
				}
			})
		} catch (e) {}
		return true
	}
})

