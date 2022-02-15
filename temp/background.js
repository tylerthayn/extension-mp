
function Playlist () {
	let list = []
	let _list = list, _history = [], previousCount = 0
	let random = false, repeat = 'None'
	let _current = null

	chrome.storage.sync.get(null, function (storage) {
		storage.Get('playlist', []).forEach(item => {list.push(item)})
		random = storage.random || false
		repeat = storage.repeat || 'None'
	})

	Define(list, 'random', random)
	Define(list, 'repeat', repeat)
	Define(list, '_list', {get: () => {return _list}})

	Define(list, 'current', (cb) => {
		chrome.bookmarks.get(_current.toString(), bookmarks => {
			if (bookmarks[0] && bookmarks[0].url) {
				cb(bookmarks[0].url)
			} else {
				cb(null)
			}
		})
	})
	Define(list, 'Next', (cb) => {
		if (_list.length > 0) {
			if (_current != null) {
				_history.push(_current)
			}
			if (previousCount > 0) {
				_current = _list.shift()
				previousCount--
			} else {
				if (random) {
					_list.Shuffle()
				}
				_current = _list.pop()
			}
			list.current(cb)
		} else {
			if (repeat == 'All') {
				_list = Clone(list)
				list.Next(cb)
			}
		}
	})
	Define(list, 'Previous', (cb) => {
		if (_history .length > 0) {
			_list.unshift(_current)
			previousCount++
			_current = _history.pop()
			list.current(cb)
		} else {
			cb(null)
		}
	})

	Define(list, 'Shuffle', () => {
		//if (_current == null) {
		//	list.Shuffle()
		//} else {
			_list.Shuffle()
		//}
		return list
	})

	Define(list, 'Start', () => {
		_list = Clone(list)
		chrome.storage.sync.set({running: true})
	})

	Define(list, 'Save', () => {
		chrome.storage.sync.set({playlist: list, random: random, repeat: repeat})
		return list
	})

	Define(list, 'Clear', () => {
		while(list.length > 0) {list.pop()}
		_current = null
		_list = Clone(list)
	})

	return list
}



//	chrome.tabs.query({active:true,currentWindow:true},function(tabs){var currTab=tabs[0];currTab&&(tab=currTab)});

let log = console.log, logj = function () {[...arguments].forEach(arg => {console.log(JSON.stringify(arg, null, 4))})}

window.playlist = new Playlist()

window.GetStorage = function () {
	chrome.storage.sync.get(null, function (storage) {
		logj(storage)
	})
}






chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'delete') {
		logj(request)
		try {
			chrome.tabs.query({active:true,currentWindow:true}, function (tabs) {
				chrome.bookmarks.search({url: tabs[0].url}, results => {
					chrome.bookmarks.remove(results[0].id)
				})
			})
		} catch (e) {}
		return true
	}
})




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'favorite.add') {
		logj(request)
		try {
			chrome.bookmarks.remove(request.id)
		} catch (e) {}
	}
})




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'favorite.remove') {
		logj(request)
		try {
			chrome.bookmarks.remove(request.id)
		} catch (e) {}
	}
})




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




//MSG: {cmd: 'get.file', file: 'file'} //
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.file') {
		logj(request)
		try {
			$.get(chrome.extension.getURL(request.file), (data, status, jqXHR) => {
				cb(data)
			})
		} catch (e) {}
		return true
	}
})




//MSG: {cmd: 'get.file', file: 'file'} //
chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.random') {
		logj(request)
		try {
			cb(playlist.random)
		} catch (e) {}
		return true
	}
})




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.repeat') {
		logj(request)
		try {
			cb(playlist.repeat)
		} catch (e) {}
		return true
	}
})




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.running') {
		logj(request)
		try {
			chrome.tabs.query({active:true}, function (tabs) {
				if (tabs[0].id && tabs[0].id == window.tab) {
					chrome.storage.sync.get('running', function (storage) {
						cb(storage.running || false)
					})
				} else {
					cb(false)
				}
			})
		} catch (e) {}
		return true
	}
})




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.storage') {
		logj(request)
		try {
			chrome.storage.sync.get(null, function (storage) {
				cb(storage || false)
			})
		} catch (e) {cb(false)}
		return true
	}
})




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'next') {
		logj(request)
		playlist.Next(url => {
			SendUrl(url)
		})
		return true
	}
})

function SendUrl (url) {
	chrome.tabs.query({active:true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {cmd: 'loadurl', url: url})
	})
}




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'previous') {
		logj(request)
		playlist.Previous(SendUrl)
		return true
	}
})



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




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'set.random') {
		logj(request)
		try {
			playlist.random = request.random
			playlist.Save()
		} catch (e) {}
	}
})




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'set.repeat') {
		logj(request)
		try {
			playlist.repeat = request.repeat
			playlist.Save()
		} catch (e) {}
	}
})




chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'shuffle') {
		logj(request)
		try {
			playlist.Shuffle()
		} catch (e) {}
		return true
	}
})




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



chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'stop') {
		logj(request)
		try {
			chrome.storage.sync.set({running: false})
		} catch (e) {}
	}
})




chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'delete') {
		logj(request)
		try {
			chrome.tabs.query({active:true,currentWindow:true}, function (tabs) {
				chrome.bookmarks.search({url: tabs[0].url}, results => {
					chrome.bookmarks.remove(results[0].id)
				})
			})
		} catch (e) {}
		return true
	}
})




chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'favorite.add') {
		logj(request)
		try {
			chrome.bookmarks.remove(request.id)
		} catch (e) {}
	}
})




chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'favorite.remove') {
		logj(request)
		try {
			chrome.bookmarks.remove(request.id)
		} catch (e) {}
	}
})




//MSG: {cmd: 'get.bookmarks'} //
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
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



//MSG: {cmd: 'get.file', file: 'file'} //
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.file') {
		logj(request)
		try {
			$.get(chrome.extension.getURL(request.file), (data, status, jqXHR) => {
				cb(data)
			})
		} catch (e) {}
		return true
	}
})




//MSG: {cmd: 'get.file', file: 'file'} //
chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.random') {
		logj(request)
		try {
			chrome.storage.sync.get('random', function (storage) {
				cb(storage.random || false)
			})
		} catch (e) {}
		return true
	}
})




chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.repeat') {
		logj(request)
		try {
			chrome.storage.sync.get('repeat', function (storage) {
				cb(storage.repeat || false)
			})
		} catch (e) {}
		return true
	}
})




chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'get.running') {
		logj(request)
		try {
			chrome.tabs.query({active:true,currentWindow:true}, function (tabs) {
				if (tabs[0].id == window.tab) {
					chrome.storage.sync.get('running', function (storage) {
						cb(storage.running || false)
					})
				} else {
					cb(false)
				}
			})
		} catch (e) {}
		return true
	}
})




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




chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'set.random') {
		logj(request)
		try {
				chrome.storage.sync.set({random: request.random || false})
		} catch (e) {}
	}
})




chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'set.repeat') {
		logj(request)
		try {
				chrome.storage.sync.set({repeat: request.repeat || false})
		} catch (e) {}
	}
})




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





chrome.runtime.onMessageExternal.addListener(function (request, sender, cb) {
	if (request.cmd == 'stop') {
		logj(request)
		try {
			chrome.storage.sync.set({running: false})
		} catch (e) {}
	}
})

