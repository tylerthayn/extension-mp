$(() => {
	chrome.runtime.sendMessage({cmd: "get.bookmarks"}, function (response) {
		$('div.List').append($(response))
		$('.caret > span').on('click', (event) => {
			event.preventDefault()
			event.target.parentElement.parentElement.querySelector('.nested').classList.toggle('active')
			event.target.parentElement.classList.toggle('caret-down')
		})
	})

	$('button.Save').on('click', () => {
		chrome.runtime.sendMessage({cmd: 'save.playlist', ids: $(':checked').get().map(e=>$(e).attr('id'))})
		window.close()
	})

	$('button.Start').on('click', () => {
		chrome.runtime.sendMessage({cmd: 'start', ids: $(':checked').get().map(e=>$(e).attr('id'))})
		window.close()
	})
})

