require('@tyler.thayn/js.core')
let Fs = require('fs'), Path = require('path')

try {Fs.mkdirSync(Path.resolve('./temp'))} catch (e) {}
BuildContentScript()
BuildBackgroundScript()
//BuildOverlay()

try {Fs.mkdirSync(Path.resolve('./dist'))} catch (e) {}
Fs.copyFileSync(Path.resolve('./src/manifest.json'), Path.resolve('./dist/manifest.json'))

try {Fs.mkdirSync(Path.resolve('./dist/images'))} catch (e) {}
Fs.copyFileSync(Path.resolve('./src/images/player.png'), Path.resolve('./dist/images/logo.png'))

try {Fs.mkdirSync(Path.resolve('./dist/scripts'))} catch (e) {}
Fs.copyFileSync(Path.resolve('./src/lib/web.core.js'), Path.resolve('./dist/scripts/web.core.js'))
Fs.copyFileSync(Path.resolve('./src/lib/Overlay.js'), Path.resolve('./dist/scripts/Overlay.js'))
Fs.copyFileSync(Path.resolve('./temp/content.js'), Path.resolve('./dist/scripts/content.js'))
Fs.copyFileSync(Path.resolve('./temp/background.js'), Path.resolve('./dist/scripts/background.js'))

try {Fs.mkdirSync(Path.resolve('./dist/styles'))} catch (e) {}

try {Fs.mkdirSync(Path.resolve('./dist/views'))} catch (e) {}
try {Fs.mkdirSync(Path.resolve('./dist/views/background'))} catch (e) {}
Fs.copyFileSync(Path.resolve('./src/backgroundScript/background.html'), Path.resolve('./dist/views/background/background.html'))
//try {Fs.mkdirSync(Path.resolve('./dist/views/overlay'))} catch (e) {}
//Fs.copyFileSync(Path.resolve('./temp/overlay.html'), Path.resolve('./dist/views/overlay/overlay.html'))
try {Fs.mkdirSync(Path.resolve('./dist/views/popup'))} catch (e) {}
Fs.copyFileSync(Path.resolve('./src/Ui/Popup/popup.css'), Path.resolve('./dist/views/popup/popup.css'))
Fs.copyFileSync(Path.resolve('./src/Ui/Popup/popup.html'), Path.resolve('./dist/views/popup/popup.html'))
Fs.copyFileSync(Path.resolve('./src/Ui/Popup/popup.js'), Path.resolve('./dist/views/popup/popup.js'))

function BuildOverlay () {
	let css = Fs.readFileSync(Path.resolve('./src/Ui/Overlay/overlay.css'), 'utf-8')
	let js = Fs.readFileSync(Path.resolve('./src/Ui/Overlay/overlay.js'), 'utf-8')
	let html = Fs.readFileSync(Path.resolve('./src/Ui/Overlay/overlay.html'), 'utf-8')
	html = html.split('<!-- Begin Overlay -->').pop().split('<!-- End Overlay -->').shift()

	Fs.writeFileSync(Path.resolve('./temp/overlay.html'), `<style>${css}</style>${html}<script>${js}</script>`, 'utf-8')
}

function BuildContentScript () {
	MergeFiles('./temp/content.js', './src/contentScript/content.loadurl.js', './src/contentScript/content.init.js')
}

function BuildBackgroundScript () {
	let handlers = Fs.readdirSync(Path.resolve('./src/backgroundScript/Handlers')).map(f=>`./src/backgroundScript/Handlers/${f}`)
	let externalHandlers = Fs.readdirSync(Path.resolve('./src/backgroundScript/ExternalHandlers')).map(f=>`./src/backgroundScript/ExternalHandlers/${f}`)

	handlers = handlers.concat(externalHandlers)
	MergeFiles('./temp/background.js', './src/backgroundScript/Playlist.js', './src/backgroundScript/background.js', ...handlers)

}

function MergeFiles (target, ...files) {
	let content = []

	files.forEach(file => {
		content.push(Fs.readFileSync(Path.resolve(file), 'utf-8'))
	})

	Fs.writeFileSync(Path.resolve(target), content.join('\n\n'), 'utf-8')

}




