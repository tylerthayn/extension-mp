window.tab = null
window.mode = null

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){var currTab=tabs[0];currTab&&(tab=currTab)});
	if (request.cmd === 'bookmarks') {
		chrome.bookmarks.getTree(tree => {
			sendResponse(BookmarksTree(tree[0], true)[0].outerHTML)
		})
	}
	if (request.cmd === 'start') {
		mode = 'running'
		console.log('Start: '+request.ids.join(', '))
		GetBookmarks(request.ids, urls => {
			logj(urls)
		})
	}
	if (request.cmd === 'get-mode') {
		sendResponse(mode)
	}
	return true
})

function GetBookmarks (ids, callback) {
	let urls = []


	function Bookmarks (id, cb) {
		chrome.bookmarks.getSubTree(id.toString(), bookmark => {
			if (bookmark[0].children) {
				bookmark[0].children.forEach(child => {
					ids.push(child.id)
				})
			}
			if (Reflect.has(bookmark[0], 'url')) {
				urls.push(bookmark[0].url)
			}
			cb()
		})
	}

	function Process () {
		if (ids.length > 0) {
			Bookmarks(ids.shift(), () => {
				Process()
			})
		} else {
			callback(urls)
		}
	}

	Process()


}

function BookmarksTree (tree, init = false) {
	let list = $('<ul>')
	if (!init) {
		list.addClass('nested')
	}
	tree.children.forEach(child => {
		let item = $(`<li><span>${child.title}</span><input type="checkbox" id="${child.id}"></li>`)
		if (child.children) {
			item.addClass('caret')
			item.append(BookmarksTree(child))
		}
		list.append(item)
	})
	return list
}


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
