
//MSG: {cmd: 'get.bookmarks'} //
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.bookmarks') {
		logj(request)
		try {
			chrome.storage.sync.get('playlist', function (storage) {
				chrome.bookmarks.getTree(tree => {
					cb(BookmarksTree(tree[0], storage.playlist || [], true)[0].outerHTML)
				})
			})
		} catch (e) {}
		return true
	}
})

function BookmarksTree (tree, ids, init = false) {
	let list = $('<ul>')
	if (init) {
		list.addClass('TreeView')
	}
	tree.children.forEach(child => {
		let item = $(`<li><span id="${child.id}">${child.title}</span></li>`)
		if (ids.includes(child.id)) {
			item.find('span').addClass('Selected')
		}
		if (child.children) {
			item.append(BookmarksTree(child, ids))
		}
		list.append(item)
	})
	return list
}
