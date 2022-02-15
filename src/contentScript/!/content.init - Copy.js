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
