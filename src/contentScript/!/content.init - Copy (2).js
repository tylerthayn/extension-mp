
let html = `<style>
	div.Backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width:100%;
		height:100%;
		background-color: #222222cc;
	}
	div.Bookmarks {
		background-color: #ffffff;
		position: fixed;
		top: calc( 5% );
		left: calc( 5% );
		width: 90%;
		height:90%;
		margin: 5%;
	}
</style>

<div class="Backdrop">
	<div class="Bookmarks">
		<div class="List">
		</div>
	</div>
</div>
`

$(() => {
	log('content.init.js')
})

window.GetBookmarks = () => {
	$('body').append($(html))
	chrome.runtime.sendMessage({cmd: "get.bookmarks"}, function (response) {
		console.log(response)
		$('div.List').append($(response))
		$('.caret > span').on('click', (event) => {
			event.preventDefault()
			event.target.parentElement.parentElement.querySelector('.nested').classList.toggle('active')
			event.target.parentElement.classList.toggle('caret-down')
		})
	})
}
