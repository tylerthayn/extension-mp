
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.favorite') {
		logj(request)
		try {
			chrome.tabs.query({active:true}, function (tabs) {
				chrome.bookmarks.search({url: tabs[0].url}, results => {
					chrome.storage.sync.get('favorites', function (storage) {
						//favorites = storage.favorites || []
						//cb(favorites.includes(results[0].id))
					})
				})
			})
		} catch (e) {log(e);cb(false)}
		return true
	}
})

