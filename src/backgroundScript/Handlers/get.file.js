
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

