
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

