require(['jquery', 'jquery-ui'], ($) => {
	let extId = 'dkhkjhohjpgcjgaacejpcjdlhnefpfcl'
	$('head').append($('<style>').append(CSS))

	$.widget("ui.overlay", {
		options: {
			classes: ['Ui', 'Overlay'],
			enabled: true,
			repeat: 'None', //None,All,One
			random: false,
			favorite: 'No',
			tags: []
		},
		_create: function() {
			this.element.addClass(this.options.classes)
			this.element.append($(HTML))

			this.element.find('.Button').on('click', (event) => {
				let data = $(event.target).data()
				if (data.action) {
					let request = {cmd: data.action}
					console.log(request)
					if (chrome.runtime && chrome.runtime.sendMessage) {
						try {
							chrome.runtime.sendMessage(request)
						} catch (e) {console.log(e)}
					}
				} else if (data.option) {
					this._setOption(data.option, data.value)
				} else {

				}
			})

			if ($('video').length > 0) {
				$('video').on('ended', () => {
					if (chrome.runtime && chrome.runtime.sendMessage) {
						try {
							chrome.runtime.sendMessage({cmd: 'next'})
						} catch (e) {console.log(e)}
					}
				})
			}



			this._update()
		},
		_update: function () {
			this.element.find('.Repeat').addClass('Hidden')
			this.element.find('.Repeat.'+this.options.repeat).removeClass('Hidden')
			this.element.find('.Random').addClass('Hidden')
			this.element.find('.Random.'+this.options.random).removeClass('Hidden')
			this.element.find('.Favorite').addClass('Hidden')
			this.element.find('.Favorite.'+this.options.favorite).removeClass('Hidden')
			this.options.enabled && this.element.removeClass('Hidden')
		},
		destroy: function() {

		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
			if (option == 'enabled') {
				if (typeof value !== 'undefined') {
					this.options.enabled = value
				} else {
					return this.options.enabled
				}
			}
			if (option == 'repeat') {
				if (typeof value !== 'undefined') {
					this.options.repeat = value
				} else {
					return this.options.repeat
				}
			}
			if (option == 'random') {
				if (typeof value !== 'undefined') {
					this.options.random = value
				} else {
					return this.random.repeat
				}
			}
			if (option == 'favorite') {
				if (typeof value !== 'undefined') {
					this.options.favorite = value
				} else {
					return this.options.favorite
				}
			}
			if (option == 'tags') {
				if (typeof value !== 'undefined') {
					this.options.tags = value
				} else {
					return this.options.tags
				}
			}

			let request = {cmd: 'set.'+option.toLowerCase()}
			request[option] = value
			console.log(request)
			if (chrome.runtime && chrome.runtime.sendMessage) {
				if (typeof value !== 'undefined') {
					try {
						chrome.runtime.sendMessage(extId, request)
					} catch (e) {console.log(e)}
				}
			}

			this._update()
		}
    });

})


let HTML = `
<!-- Begin Overlay -->
	<div class="Overlay">
		<div class="Menu nav navbar navbar-primary bg-primary Toolbar">
			<span class="material-icons Button Repeat None" data-option="repeat" data-value="All">repeat</span>
			<span class="material-icons Button Repeat All Hidden" data-option="repeat" data-value="One">repeat_on</span>
			<span class="material-icons Button Repeat One Hidden" data-option="repeat" data-value="None">repeat_one_on</span>
			<span class="material-icons Button Random Off false" data-option="random" data-value="On">shuffle</span>
			<span class="material-icons Button Random On true Hidden" data-option="random" data-value="Off">shuffle_on</span>
			<span class="material-icons Button Shuffle" data-action="shuffle">wifi_protected_setup</span>
			<span class="material-icons Button Favorite No" data-option="favorite" data-value="Yes">favorite_border</span>
			<span class="material-icons Button Favorite Yes Hidden" data-option="favorite" data-value="No">favorite</span>
			<span class="material-icons Button Delete" data-action="delete">delete_forever</span>
			<span class="material-icons Button">settings</span>
			<span class="material-icons Button Stop" data-action="power">settings_power</span>
		</div>
		<div class="material-icons Button Previous" data-action="previous">skip_previous</div>
		<div class="material-icons Button Next" data-action="next">skip_next</div>
	</div>
<!-- End Overlay -->
`

let CSS =
`
.Overlay.Hidden, .Overlay .Hidden {display: none;}

.Overlay .Menu {
	position: fixed !important;
	left: 0;
	top: 0;
	width: 100%;
	height: 50px;
	z-index: 1001;
	background-color: #336699;
}

.Overlay .Menu span {
	width: auto;
}

.Overlay .Menu .Button {
	font-size: 36px;
	width: 50px;
	height: 50px;
	cursor: pointer;
	color: white;
}

.Overlay .Menu .Button:hover {
	color: red;
}

.Overlay .Menu span.Button {
	margin-left: 5px;
	margin-right: 5px;
}

.Overlay .Button.Previous {
	height: 50px;
	position: fixed;
	left: 0;
	bottom: 50px;
	width: 50px;
	font-size: 4em;
	cursor: pointer;
	z-index: 1001;
}

.Overlay .Button.Next {
	cursor: pointer;
	height: 50px;
	width: 50px;
	position: fixed;
	right: 50px;
	bottom: 50px;
	font-size: 4em;
	z-index: 1001;
}

.Overlay .Button.Random.On {
	color: #66ff99;
}

.Overlay div.Button {
	color: purple;
}
.Overlay .Button.Next:hover, .Overlay .Button.Previous:hover {
	color: red;

}

.Overlay .Button.Repeat {
	color: #66ff99;
}
.Overlay .Button.Repeat.None {
	color: white;
}

`

