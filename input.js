export default class InputHandler {
	constructor(game) {
		this.game = game
		this.keys = []
		window.addEventListener('keydown', (e) => {
			if (
				(e.key === 'ArrowLeft' ||
					e.key === 'ArrowRight' ||
					e.key === 'a' ||
					e.key === 'd') &&
				this.keys.indexOf(e.key)
			) {
				this.keys.push(e.key)
			}
		})
		window.addEventListener('keyup', (e) => {
			if (
				e.key === 'ArrowLeft' ||
				e.key === 'ArrowRight' ||
				e.key === 'a' ||
				e.key === 'd'
			) {
				this.keys.splice(this.keys.indexOf(e.key), 1)
			}
		})
	}
}
