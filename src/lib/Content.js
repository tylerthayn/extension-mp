define(['jquery', 'bootstrap', 'jquery-ui', 'notifyjs', '@js/core'], ($, bootstrap) => {
	let content = {}
	Object.Extensions.EventEmitter(bg)

	let _emit = content.emit
	Define(content, 'emit', function (type, options, cb) {
		Send({action: type, options: options}, cb)
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
		chrome.runtime.sendMessage(msg, function () {
			log(`<Response(${JSON.stringify(arguments, null, 4)})`)

			if (cb instanceof Function) {
				cb.apply(null, arguments)
			}
		})
	}

	Define(bg, 'Get', function (property, defaultValue, cb) {
		Send({get: property}, val => {
			cb(typeof val === 'undefined' || value == null || value == "" ? defaultValue : val)
		})
	})

	Define(bg, 'Set', function (property, value, cb) {
		Send({set: property, value: value}, cb)
	})

	return bg

})
