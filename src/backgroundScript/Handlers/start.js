
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'start') {
		logj(request)
		try {
			chrome.tabs.query({active:true}, function (tabs) {
				GetBookmarkIds(request.ids, ids => {
					window.playlist.Clear()
					ids.forEach(id => {
						window.playlist.push(id)
					})
					window.playlist.Save()
					window.tab = tabs[0].id
					window.playlist.Start()
					playlist.Next(url => {
						chrome.tabs.sendMessage(tabs[0].id, {cmd: 'loadurl', url: url})
					})
				})
			})
		} catch (e) {log(e)}
		return true
	}
})


function GetBookmarkUrl (id, cb) {
	chrome.bookmarks.get(id.toString(), bookmarks => {
		if (bookmarks[0] && bookmarks[0].url) {
			cb(bookmarks[0].url)
		} else {
			cb(null)
		}
	})
}


function GetBookmarkIds (ids, callback) {
	let _ids = [], urls = []
	function Bookmarks (id, cb) {
		_ids.push(id)
		chrome.bookmarks.getSubTree(id.toString(), bookmark => {
			if (bookmark[0].children) {
				bookmark[0].children.forEach(child => {
					ids.push(child.id)
				})
			}
			if (Reflect.has(bookmark[0], 'url')) {
				urls.push(bookmark[0].url)
			}
			cb()
		})
	}

	function Process () {
		if (ids.length > 0) {
			Bookmarks(ids.shift(), () => {
				Process()
			})
		} else {
			callback(_ids)
		}
	}
	Process()
}
