//	chrome.tabs.query({active:true,currentWindow:true},function(tabs){var currTab=tabs[0];currTab&&(tab=currTab)});
let log = console.log, logj = function () {[...arguments].forEach(arg => {console.log(JSON.stringify(arg, null, 4))})}
let ActionHandlers = {}

log('Loading action handlers...')
require(['ActionHandlers/index.js'], (handlers) => {
	log('\t'+Object.keys(handlers).join(', '))
	Extend(ActionHandlers, handlers)
})


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action) {
		log(`ActionRequest(${request.action})`)
		if (ActionHandlers[request.action]) {
			ActionHandlers[request.action].apply(null, [...request.args, function () {
				log(`ActionRequest(${request.action}): ${JSON.stringify(arguments, null, 4)}`)
				sendResponse.apply(null, arguments)
			}])
		}
		return true
	}
})



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.cmd == 'get-file') {
		log(`get-file: ${request.file}`)
		$.get(chrome.extension.getURL(request.file), (data, status, jqXHR) => {
			log(status)
			sendResponse(data)
		})
		return true
	}
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.cmd === 'get-mode') {
		sendResponse(mode)
		return true
	}
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.cmd === 'start') {
		console.log('Start: ' + request.ids.join(', '))
		mode = 'running'
		GetBookmarks(request.ids, urls => {
			logj(urls)
		})
		return true
	}
})





/*
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() {
           console.log("popup has been closed")
			console.dir(bookmarks)
        });
    }
});
*/
/*
chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set({mode: false}, function() {
		console.log('Manager mode: ' + false)
	})
})

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.storage.local.get(['mode'], function(result) {
		chrome.storage.local.set({mode: !result.mode}, function() {
			console.log('Manager mode: ' + !result.mode)
			chrome.browserAction.setIcon({path: `images/airplay_${!result.mode ? 'red' : 'blue'}.png`})
			if (!result.mode) {
				chrome.browserAction.setPopup({popup: 'popup.html', tabId: tab.id}, () => {log('callback')})
			}
		})
	})
})

*/



//UpdateBrowserActionIcon()


/*
import { contentUtils } from '../utils/contentUtils.js';
import { tabUtils } from '../utils/tabUtils.js';

const init = () => {
    console.log('Init background.js');
    openTabAndReadContent();
};

let openTabAndReadContent = async () => {
    const URL = 'https://www.amazon.com/Hasbro-N-A-Connect-Shots/dp/B07BMK2ZJK/ref=sr_1_1?' +
        'm=AGANW9QX5OJOI&marketplaceID=ATVPDKIKX0DER&qid=1575549241&s=merchant-items&sr=1-1';

    try {
        const responseTab = await tabUtils.openLinkInNewTab(URL);

        console.log('responseTab ', responseTab);
        const responseContent = await contentUtils.getContentOfTab(responseTab.id);

        console.log('responseContent ', responseContent);
        await tabUtils.close(responseTab.id);
    } catch (error) {
        console.error('error ', error);
    }
};

window.onload = init;

*/
