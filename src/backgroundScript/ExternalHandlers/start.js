
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'start') {
		logj(request)
		try {
			chrome.tabs.query({active:true,currentWindow:true}, function (tabs) {
				chrome.storage.sync.set({playlist: request.ids, running: true}, function() {
					GetBookmarks(request.ids, urls => {
						Define(urls, 'current', 0)
						Define(urls, 'Current', {get: function () {return this[this.current]}})
						window.playlist = urls
						window.tab = tabs[0].id
						chrome.tabs.sendMessage(tabs[0].id, {cmd: 'load.url', url: urls.Current})
					})
				})
			})
		} catch (e) {}
		return true
	}
})


