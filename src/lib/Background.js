define('Background', ['jquery', 'bootstrap', 'jquery-ui', 'notifyjs', '@js/core'], ($, bootstrap) => {
	let bg = {}
	Object.Extensions.EventEmitter(bg)

	let _emit = bg.emit
	Define(bg, 'emit', function (type, options, cb) {
		let request = {}
		request[type] = options
		Send(request, cb)
	})

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.action) {
			log(`<Request(${JSON.stringify(request, null, 4)})`)
			bg._emit.call(bg, request.action, Extend({}, request, {cb: (args) => {
				log(`>Response(${JSON.stringify(args, null, 4)})`)
				sendResponse(args)
			}}))
			return true
		}
	})

	function Send (msg, cb) {
		log(`>Request(${JSON.stringify(msg, null, 4)})`)
		chrome.runtime.sendMessage(msg, function (response) {
			log(`<Response(${JSON.stringify(response, null, 4)})`)

			if (cb instanceof Function) {
				cb(response)
			}
		})
	}

	Define(bg, 'Get', function (property, args, defaultValue, cb) {
		let request = {}
		request['get.'+property] = args
		Send(request, response => {
			cb(typeof response === 'undefined' || response == null || response == "" ? defaultValue : response)
		})
	})

	Define(bg, 'Set', function (property, value, cb) {
		let request = {}
		request['set.'+property] = value
		Send(request, cb)
	})

	return bg

})
