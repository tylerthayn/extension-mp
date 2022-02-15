console.log('toolbar.js...')
require(['jquery', 'jquery-ui'], ($) => {
console.log('...toolbar.js')
	function ContentContainer (parent) {
		parent.addClass('ui-toolbar-container')
		let content = parent.children('.ui-content')
		if (parent.children('.ui-content').length == 0) {
			content = $('<div class="ui-content">')
			parent.append(content)
		}
		parent.children().not('.ui-toolbar,.ui-toolbar-hover,.ui-content').get().forEach(child => {content.append($(child).detach())})
	}

	$.widget("ui.toolbar", {
		options: {
			classes: ['ui', 'ui-toolbar', 'navbar', 'navbar-dark', 'bg-primary'],
			autohide: false,
			position: 'top'
		},
		_create: function() {
			ContentContainer(this.element.parent())
			this.element.addClass(this.options.classes)
			if (this.element.hasClass('ui-autohide')) {this.options.autohide = true}
			if (this.element.hasClass('ui-top')) {this.options.position = 'top'}
			if (this.element.hasClass('ui-bottom')) {this.options.position = 'bottom'}

			this.options.hover = this._createHover()
			this._update()
		},
		_update: function () {
			// Update element classes accordingly
			if (this.options.autohide === true) {this.element.addClass('ui-autohide ui-hidden')}
			else {this.element.removeClass('ui-autohide ui-hidden')}
			this.element.removeClass('ui-top ui-bottom')
			this.element.addClass('ui-'+this.options.position)

			// Update element positions
			let parent = this.element.parent()
			let content = this.element.parent().children().index(this.element.parent().children('.ui-content'))
			if (this.options.position == 'bottom') {
				if (this.element.parent().children().index(this.element) < content) {
					parent.append(this.element.detach())
				}
				this.element.after(this.options.hover.detach())
			} else {
				if (this.element.parent().children().index(this.element) > content) {
					parent.prepend(this.element.detach())
				}
				this.element.before(this.options.hover.detach())
			}


		},
		_createHover: function () {
			let hover = $('<div class="ui-toolbar-hover"></div>')
			this.options.position == 'bottom' ? this.element.after(hover) : this.element.before(hover)
			hover.css({
				top: this.options.position == 'top' ? this.element[0].offsetParent.offsetTop + (0*this.element[0].offsetTop) : this.element[0].offsetParent.offsetTop + this.element[0].offsetParent.offsetHeight - this.element.height(),
				left: this.element[0].offsetParent.offsetLeft + this.element[0].offsetLeft,
				width: this.element.width() + 'px',
				height: this.element.height() + 'px',
				'z-index': this.options.autohide ? 50 : -1
			})
			let showFn = () => {
				if (this.options.autohide === true) {
					this.element.removeClass('ui-hidden')
					hover.css('z-index', -1)
					hover.off('mouseenter', showFn)
					this.element.on('mouseleave', hideFn)
				}
			}
			let hideFn = () => {
				if (this.options.autohide === true) {
					this.element.addClass('ui-hidden')
					this.element.off('mouseleave', hideFn)
					setTimeout(() => {hover.css('z-index', 50); hover.on('mouseenter', showFn)}, parseFloat(this.element.css('transition-duration').replace('s', ''))*1000)
				}
			}

			hover.on('mouseenter', showFn)
			return hover
		},
		destroy: function() {

		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
			if (option == 'hover') {
				return this.options.hover
			}
			if (option == 'position') {
				if (value) {
					if (value != 'top' && value != 'bottom') {
						throw new Error('Invalid ui-toolbar position value: '+value)
					}
					this.options.position = value
				} else {
					return this.options.position
				}
			}
			if (option == 'autohide') {
				if (typeof value !== 'undefined') {
					if (value !== true && value !== false) {
						throw new Error('Invalid ui-toolbar autohide value: '+value)
					}
					this.options.autohide = value
				} else {
					return this.options.autohide
				}
			}
			this._update()
		}
    });


	$('.ui-toolbar').toolbar()

})
