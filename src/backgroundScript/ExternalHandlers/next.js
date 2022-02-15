
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'next') {
		logj(request)

			chrome.storage.sync.get(null, function (storage) {
logj(storage)
				let current = storage.current || 0
				if (storage.repeat === 1) {
					cb(storage.playlist[current])
				} else if (current >= storage.playlist.length && storage.repeat === true) {
					currrent = storage.random ? Math.round(Math.random() * storage.playlist.length) : current + 1
					chrome.storage.sync.set({current: current})
					cb(storage.playlist[current])
				} else {
					cb(null)
				}
			})

		return true
	}
})

