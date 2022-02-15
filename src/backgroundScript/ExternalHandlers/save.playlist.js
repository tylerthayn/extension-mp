
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'save.playlist') {
		logj(request)
		try {
				chrome.storage.sync.set({playlist: request.ids}, function() {
					console.log('Playlist saved ' + request.ids)
				})
		} catch (e) {}
		return true
	}
})

