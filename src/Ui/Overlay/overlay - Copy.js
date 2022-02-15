console.log('overlay.js')
window.Overlay = {}


$(() => {
	$(window).on('overlay', function () {
		TriggerAction('get-file', 'Ui/Overlay/overlay.html', contents => {
			log(contents)
		})
	})

	$(window).on('overlay-register-buttonhandlers', () => {
		$('.ManagerOverlay .Button').on('click', (event) => {
			TriggerAction($(event.target).data('trigger'))
		})
	})
})


/*
let overlay = {
	html: `
<div class="ManagerOverlay ui-content">
	<div class="ui-toolbar ui-top">
		<span class="material-icons">repeat</span>
		<span class="material-icons">repeat_one</span>
		<span class="material-icons">shuffle</span>

		<span class="material-icons">delete_forever</span>

		<span class="material-icons">favorite_border</span>
		<span class="material-icons">favorite</span>
	</div>
</div>
`
}

console.log('content.js')

$(window).on('web-ready', () => {
	logj('web-ready')
	console.dir($)
	console.dir($.ui)
	console.dir($.ui.toolbar)
})



function SetupOverlay () {
	$('body').append($(overlay.html))
	$('div.ManagerOver.ui-toolbar').toolbar()
}

function InsertControls () {

	$('body').append($('<div class="Skip Back"><i class="material-icons">skip</i></div>'))
	$('body').append($('<div class="Skip Forward"><i class="material-icons">next</i></div>'))


}
*/

