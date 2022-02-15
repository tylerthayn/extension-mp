
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

