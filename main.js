/** @type {HTMLCanvasElement} */
import Background from './background.js'
import Ball from './ball.js'
import CreateBlocks from './createBlocks.js'
import InputHandler from './input.js'
import Player from './player.js'
import UI from './ui.js'

window.addEventListener('load', function () {
	const loading = document.getElementById('loading')
	loading.style.display = 'none'
	// Basic canvas project setup
	const canvas = document.getElementById('canvas1')
	const ctx = canvas.getContext('2d')
	canvas.style.display = 'block'
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	class Game {
		constructor(width, height) {
			this.width = width
			this.height = height
			this.groundMargin = 40
			this.gameOver = false
			this.score = 0
			this.winningScore = 10
			this.time = 0
			this.numOfBalls = 1
			this.bounceSpeed = 5
			this.fontColor = 'white'
			this.sound = document.getElementById('beep')
			this.sound.volume = 0.4
			this.soundGameOver = document.getElementById('beep-gameOver')
			this.soundGameOver.volume = 0.2
			this.background = new Background(this)
			this.player = new Player(this)
			this.input = new InputHandler(this)
			this.balls = [new Ball(this)]
			this.ui = new UI(this)
			this.blocks = new CreateBlocks(this)
		}
		update(deltaTime) {
			if (this.score === this.winningScore) {
				this.gameOver = true
			}
			if (!this.gameOver) {
				this.time += deltaTime
			}
			this.player.update(this.input.keys)
			this.balls.forEach((ball) => ball.update())
			this.blocks.update()
		}
		draw(context) {
			this.background.draw(context)
			this.player.draw(context)
			this.balls.forEach((ball) => ball.draw(context))
			this.blocks.draw(context)
			this.ui.draw(context)
		}
		restart() {
			// Reset game to initial values
			this.gameOver = false
			this.score = 0
			this.time = 0
			this.player.reset()
			this.balls = [new Ball(this)]
			this.balls.forEach((ball) => ball.reset())
			this.blocks = new CreateBlocks(this)
			this.bounceSpeed = 5
		}
	}

	const game = new Game(canvas.width, canvas.height)

	let continueGameLoop = true
	let lastTime = 0
	function animate(timeStamp) {
		const deltaTime = timeStamp - lastTime
		lastTime = timeStamp
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.update(deltaTime)
		game.draw(ctx)
		if (continueGameLoop) {
			requestAnimationFrame(animate)
		}
	}
	function restartGame() {
		continueGameLoop = true
		game.restart()
		animate(0)
	}
	animate(0)
})
