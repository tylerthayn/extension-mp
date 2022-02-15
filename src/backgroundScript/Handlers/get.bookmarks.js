
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
	if (!init) {
		list.addClass('nested')
	}
	tree.children.forEach(child => {
		let item = $(`<li><span>${child.title}</span><input type="checkbox" id="${child.id}"></li>`)
		if (ids.includes(child.id)) {
			item.find('input').attr('checked', true)
		}
		if (child.children) {
			item.addClass('caret')
			item.append(BookmarksTree(child, ids))
		}
		list.append(item)
	})
	return list
}
