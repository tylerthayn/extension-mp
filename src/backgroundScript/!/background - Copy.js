//	chrome.tabs.query({active:true,currentWindow:true},function(tabs){var currTab=tabs[0];currTab&&(tab=currTab)});

let log = console.log, logj = function () {[...arguments].forEach(arg => {console.log(JSON.stringify(arg, null, 4))})}

log('Loading Handlers...')
require(['Handlers/index.js', '@js/core'], (handlers) => {
	log('\t'+Object.keys(handlers).join(', '))
	Extend(Handlers, handlers)

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		let action = Object.keys(request)[0]
		Handlers[action](request[action], sendResponse)
		return true
/*
		Object.keys(Handlers).forEach(handler => {
			if (request, handler, null) != null) {
				log(`>Handler(${JSON.stringify(request, null, 4)})`)
				Object.prototype.Get.call(request, handler, null)(request, (response) => {
					log(`<Handler(${JSON.stringify(response, null, 4)})`)
					sendResponse(response)
				})
				return true
			}
		})
*/
	})

})

