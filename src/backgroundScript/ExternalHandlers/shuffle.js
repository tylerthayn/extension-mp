
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'shuffle') {
		logj(request)
		try {
			chrome.storage.sync.get(playlist, function (storage) {
				storage.playlist.Shuffle()
				chrome.storage.sync.set({playlist: storage.playlist}, function() {
					console.log('Playlist saved ' + storage.playlist)
				})
			})
		} catch (e) {}
		return true
	}
})

