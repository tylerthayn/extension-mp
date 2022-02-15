
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'favorite.add') {
		logj(request)
		try {
			chrome.bookmarks.remove(request.id)
		} catch (e) {}
	}
})

