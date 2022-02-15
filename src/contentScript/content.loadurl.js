chrome.runtime.onMessage.addListener(function (request, sender, cb) {
	if (request.cmd == 'loadurl') {
		console.log(request)
		try {
			location.href = request.url
		} catch (e) {}
	}
})
