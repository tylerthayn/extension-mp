require(['../../scripts/jquery.ui.tree.js'], () => {
	$(() => {
		$('.TreeView').tree()

		chrome.runtime.sendMessage({cmd: "get.bookmarks"}, function (response) {
			$('div.List').append($(response))
			$('.TreeView').tree()
		})

		$('button.Save').on('click', () => {
			chrome.runtime.sendMessage({cmd: 'save.playlist', ids: $(':checked').get().map(e=>$(e).attr('id'))})
			window.close()
		})

		$('button.Start').on('click', () => {
			chrome.runtime.sendMessage({cmd: 'start', ids: $('.Selected').get().map(e=>$(e).attr('id'))})
			window.close()
		})
	})
})
