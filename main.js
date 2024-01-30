/** @type {HTMLCanvasElement} */
import Background from './background.js'
import InputHandler from './input.js'
import Player from './player.js'

window.addEventListener('load', function () {
	const loading = document.getElementById('loading')
	loading.style.display = 'none'
	// Basic canvas project setup
	const canvas = document.getElementById('canvas1')
	const ctx = canvas.getContext('2d')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	class Game {
		constructor(width, height) {
			this.width = width
			this.height = height
			this.groundMargin = 40
			this.gameOver = false
			this.score = 0
			this.background = new Background(this)
			this.player = new Player(this)
			this.input = new InputHandler(this)
		}
		update(deltaTime) {
			this.player.update(this.input.keys)
		}
		draw(context) {
			this.background.draw(context)
			this.player.draw(context)
		}
	}

	const game = new Game(canvas.width, canvas.height)

	let lastTime = 0
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime
		lastTime = timeStamp
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.update(deltaTime)
		game.draw(ctx)
		requestAnimationFrame(animate)
	}
	animate(0)
})
