//let extId = 'dkhkjhohjpgcjgaacejpcjdlhnefpfcl'

let Overlay = {


function OverlayInit (extId) {



	$(() => {
		console.log('overlay.js')
		chrome.runtime.sendMessage(extId, {cmd: 'get.repeat'}, (repeat) => {
			console.log(repeat)
			if (repeat === true) {
				$('.Manager .Button.Repeat').addClass('Hidden')
				$('.Manager .Button.RepeatAll').removeClass('Hidden')
			}
			if (repeat === 1) {
				$('.Manager .Button.Repeat').addClass('Hidden')
				$('.Manager .Button.RepeatOne').removeClass('Hidden')
			}
		})

		chrome.runtime.sendMessage(extId, {cmd: 'get.random'}, (random) => {
			console.log(random)
			if (random === true) {
				$('.Manager .Button.Random').addClass('Hidden')
				$('.Manager .Button.RandomOn').removeClass('Hidden')
			}
		})

		chrome.runtime.sendMessage(extId,{cmd: 'get.favorite'}, (favorite) => {
			console.log(favorite)
			if (favorite === true) {
				$('.Manager .Button.Favorite').addClass('Hidden')
				$('.Manager .Button.FavoriteOn').removeClass('Hidden')
			}
		})


		$('.Manager .Button.Stop').on('click', () => {
			console.log('stop')
			chrome.runtime.sendMessage(extId,{cmd: 'stop'})
		})
		$('.Manager .Button.Repeat').on('click', () => {
			console.log('Repeat')
			chrome.runtime.sendMessage(extId,{cmd: 'set.repeat', repeat: true})
			$('.Manager .Button.Repeat').addClass('Hidden')
			$('.Manager .Button.RepeatAll').removeClass('Hidden')
		})
		$('.Manager .Button.RepeatAll').on('click', () => {
			console.log('RepeatAll')
			chrome.runtime.sendMessage(extId,{cmd: 'set.repeat', repeat: 1})
			$('.Manager .Button.RepeatAll').addClass('Hidden')
			$('.Manager .Button.RepeatOne').removeClass('Hidden')
		})
		$('.Manager .Button.RepeatOne').on('click', () => {
			console.log('RepeatOne')
			chrome.runtime.sendMessage(extId,{cmd: 'set.repeat', repeat: false})
			$('.Manager .Button.RepeatOne').addClass('Hidden')
			$('.Manager .Button.Repeat').removeClass('Hidden')
		})
		$('.Manager .Button.Random').on('click', () => {
			console.log('Randome')
			chrome.runtime.sendMessage(extId,{cmd: 'set.random', random: true})
			$('.Manager .Button.Random').addClass('Hidden')
			$('.Manager .Button.RandomOn').removeClass('Hidden')
		})
		$('.ManagerOver .Button.RandomOn').on('click', () => {
			console.log('RandomOn')
			chrome.runtime.sendMessage(extId,{cmd: 'set.random', random: false})
			$('.Manager .Button.RandomOn').addClass('Hidden')
			$('.Manager .Button.Random').removeClass('Hidden')
		})
		$('.Manager .Button.Shuffle').on('click', () => {
			console.log('Shuffle')
			chrome.runtime.sendMessage(extId,{cmd: 'shuffle'})
		})
		$('.Manager .Button.Favorite').on('click', () => {
			console.log('Favorite')
			chrome.runtime.sendMessage(extId,{cmd: 'favorite.add', random: true})
			$('.Manager .Button.Favorite').addClass('Hidden')
			$('.Manager .Button.FavoriteOn').removeClass('Hidden')
		})
		$('.Manager .Button.FavoriteOn').on('click', () => {
			console.log('FavoriteOn')
			chrome.runtime.sendMessage(extId,{cmd: 'favorite.remove', random: false})
			$('.Manager .Button.FavoriteOn').addClass('Hidden')
			$('.Manager .Button.Favorite').removeClass('Hidden')
		})
		$('.Manager .Button.Delete').on('click', () => {
			console.log('Delete')
			chrome.runtime.sendMessage(extId,{cmd: 'delete'})
		})


		$('.Manager.Button.Previous').on('click', () => {
			console.log('Previous')
			chrome.runtime.sendMessage(extId,{cmd: 'previous'}, url => {
				if (url != null) {
					location.href = url
				}
			})
		})
		$('.Manager.Button.Next').on('click', () => {
			console.log('Next')
			chrome.runtime.sendMessage(extId,{cmd: 'next'}, url => {
				if (url != null) {
					location.href = url
				}
			})
		})

	})

}
