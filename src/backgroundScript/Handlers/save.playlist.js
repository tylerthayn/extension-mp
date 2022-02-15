
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'save.playlist') {
		logj(request)
		try {
			GetBookmarkIds(request.ids, ids => {
				playlist.Clear()
				ids.forEach(playlist.push)
				playlist.Save()
			})
		} catch (e) {}
		return true
	}
})

