require(['jquery', 'bootstrap', 'Background', 'jquery-ui', 'notifyjs', '@js/core'], ($, Bootstrap, bg) => {
	const {log, logj} = new Logger('ContentScript')
	window.bg = bg

	$(() => {

		bg.Get('file', {file: 'Ui/Overlay/overlay.html'}, '', mode => {
			log(mode)
		})

		bg.on('load-url', (event, url) => {
			location.href = url
		})
	})
})

/***
Trigger Event for content scripts and Message to background
(action, ...args, cb)

window.Trigger = function (args, cb) {
	log(`>Trigger(${JSON.stringify(args, null, 4)})`)

	/* Trigger for Content Side
	$(window).trigger(action, args)

	/* Trigger for Background
	let request = {}
	request[action] = args
	chrome.runtime.sendMessage({action: action, args: args}, function () {
		log(`TriggerAction(${args.first}): ${JSON.stringify(arguments, null, 4)}`)
		if (cb instanceof Function) {
			cb.apply(null, arguments)
		}
	})
}

/***
Receive action triggers from background script
{action: name, args: []}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action) {
		log(`ActionRequest(${request.action})`)
		let args = [request.action].concat(request.args)
		$(window).trigger.apply($(window), [request.action, ...request.args, function () {
			log(`ActionRequest(${request.action}): ${JSON.stringify(arguments, null, 4)}`)
			sendResponse.apply(null, arguments)
		}])
	}
	return true
})

*/



