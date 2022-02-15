$(() => {
	if (!RefreshUrl()) {
		chrome.runtime.sendMessage({cmd: 'get.running'}, function (response) {
			console.log('Running: '+response)
			if (response === true) {
				chrome.runtime.sendMessage({cmd: 'get.storage'}, function (storage) {
					$overlay = $('body').overlay({
						repeat: storage.repeat,
						random: storage.random
					})
				})
				chrome.runtime.sendMessage({cmd: 'get.favorite'}, function (favorite) {
					$('body').overlay('option', 'favorite', favorite)
				})
			}
		})
	}
})

function RefreshUrl () {

	if (location.href.match(/drtuber.com\/video/) != null) {
		location.href = 'https://drtuber.com/embed/'+location.href.match(/drtuber.com\/video\/(.+?)\//)[1]
	}


	return false
}
